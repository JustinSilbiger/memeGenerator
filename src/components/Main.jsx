import { useState, useEffect, useRef } from "react"

export default function Main() {
    const [meme, setMeme] = useState({
        topText: "One does not simply",
        bottomText: "Walk into Mordor",
        imageUrl: ""
    })

    const [allMemes, setAllMemes] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const canvasRef = useRef(null)

    useEffect(() => {
        let isMounted = true

        async function fetchMemes() {
            try {
                setIsLoading(true)
                setError(null)
                const response = await fetch("https://api.imgflip.com/get_memes")
                
                if (!response.ok) {
                    throw new Error('Failed to fetch memes')
                }

                const data = await response.json()

                if (!isMounted) return

                setAllMemes(data.data.memes)
                const randomIndex = Math.floor(Math.random() * data.data.memes.length)
                const randomMeme = data.data.memes[randomIndex].url
                
                setMeme(prevMeme => ({
                    ...prevMeme,
                    imageUrl: randomMeme
                }))
            } catch (err) {
                if (isMounted) {
                    setError('Failed to load memes. Please try again later.')
                    console.error('Error fetching memes:', err)
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false)
                }
            }
        }

        fetchMemes()

        return () => {
            isMounted = false
        }
    }, [])

    function getMemeImage() {
        const randomIndex = Math.floor(Math.random() * allMemes.length)
        const newMeme = allMemes[randomIndex].url
        setMeme(prevMeme => ({
            ...prevMeme,
            imageUrl: newMeme
        }))
    }

    function handleChange(event) {
        const { value, name } = event.currentTarget
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }

    async function downloadMeme() {
        try {
            // Create a temporary canvas
            const canvas = canvasRef.current
            const ctx = canvas.getContext('2d')

            // Create a new image object
            const img = new Image()
            img.crossOrigin = "anonymous"  // Enable CORS
            
            // Wait for image to load
            await new Promise((resolve, reject) => {
                img.onload = resolve
                img.onerror = reject
                img.src = meme.imageUrl
            })

            // Set canvas size to match image
            canvas.width = img.width
            canvas.height = img.height

            // Draw the image
            ctx.drawImage(img, 0, 0)

            // Configure text style
            ctx.fillStyle = 'white'
            ctx.strokeStyle = 'black'
            ctx.lineWidth = Math.max(canvas.width * 0.004, 2)  // Responsive stroke width
            ctx.textAlign = 'center'
            ctx.textBaseline = 'top'
            
            // Calculate font size (responsive)
            const fontSize = Math.min(canvas.width * 0.1, 100)
            ctx.font = `bold ${fontSize}px Impact`

            // Add top text
            const topY = canvas.height * 0.05
            ctx.strokeText(meme.topText, canvas.width/2, topY)
            ctx.fillText(meme.topText, canvas.width/2, topY)

            // Add bottom text
            const bottomY = canvas.height * 0.85
            ctx.strokeText(meme.bottomText, canvas.width/2, bottomY)
            ctx.fillText(meme.bottomText, canvas.width/2, bottomY)

            // Convert to jpeg and download
            const dataUrl = canvas.toDataURL('image/jpeg', 0.9)
            const link = document.createElement('a')
            link.download = 'my-meme.jpg'
            link.href = dataUrl
            link.click()

        } catch (err) {
            console.error('Error downloading meme:', err)
            alert('Failed to download meme. Please try again.')
        }
    }

    return (
        <main>
            <div className="form">
                <label>Top Text
                    <input
                        type="text"
                        placeholder="One does not simply"
                        name="topText"
                        onChange={handleChange}
                        value={meme.topText}
                    />
                </label>

                <label>Bottom Text
                    <input
                        type="text"
                        placeholder="Walk into Mordor"
                        name="bottomText"
                        onChange={handleChange}
                        value={meme.bottomText}
                    />
                </label>
                <div className="button-container">
                    <button 
                        onClick={getMemeImage}
                        disabled={isLoading || error}
                    >
                        Get a new meme image 🖼️
                    </button>
                    <button 
                        onClick={downloadMeme}
                        disabled={isLoading || error || !meme.imageUrl}
                        className="download-button"
                    >
                        Download Meme 💾
                    </button>
                </div>
            </div>
            <div className="meme">
                {isLoading && <p>Loading...</p>}
                {error && <p className="error-message">{error}</p>}
                {meme.imageUrl && !isLoading && !error && (
                    <>
                        <img src={meme.imageUrl} alt="meme" />
                        <span className="top">{meme.topText}</span>
                        <span className="bottom">{meme.bottomText}</span>
                    </>
                )}
            </div>
            <canvas 
                ref={canvasRef} 
                style={{ display: 'none' }}
            />
        </main>
    )
}