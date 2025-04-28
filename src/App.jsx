import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [newsArticles, setNewsArticles] = useState([])
  const [loading, setLoading] = useState(true)

  const apiKey = "8e5f7c4ea2254daa8c34f9d6f4ad5756"  // Replace with your actual API key from NewsAPI

  // Fetch news articles from the API
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("https://newsapi.org/v2/top-headlines", {
          params: {
            country: "us",
            apiKey: apiKey,
            pageSize: 10,
          }
        })
        setNewsArticles(response.data.articles)
      } catch (error) {
        console.error("Error fetching news", error)
      }
      setLoading(false)
    }

    fetchNews()
  }, [apiKey])

  return (
    <div className="App">
      <h1>Top News Articles</h1>

      {loading ? (
        <p>Loading news...</p>
      ) : (
        <div className="news-container">
          {newsArticles.map((article, index) => (
            <div key={index} className="news-card">
              {article.urlToImage && (
                <img src={article.urlToImage} alt="News" className="news-image" />
              )}
              <div className="news-content">
                <h2>{article.title}</h2>
                <p>{article.description}</p>
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  Read more
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App
