import React, { useEffect, useState } from 'react';

const Schemedata = () => {

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

 
  const fetchArticles = async () => {
    try {
      const response = await fetch('https://news-api-ashen-delta.vercel.app/api/news/agriculture'); 
      if (!response.ok) {
        throw new Error('Failed to fetch articles');
      }
      const data = await response.json();
      setArticles(data.articles);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    fetchArticles();
  }, []);

 
  return (
    <div>
      {/* <h1 className="text-2xl font-bold">News</h1>
      <p className="mt-4">All the News Related to Farmers</p> */}

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="mt-4">
        {articles.length > 0 ? (
          articles.map((article, index) => (
            <div key={index} className=" bg-white rounded-lg shadow-lg p-5 border-b-2 border-black flex mb-5">
              <div >
              <h2 className="text-xl font-semibold">{article.title}</h2>
              <p className="text-gray-700">{article.description}</p>
              <p className="text-sm text-gray-500">Published on: {new Date(article.publishedAt).toLocaleDateString()}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                Read more
              </a></div>
              <div>
              {article.urlToImage && (
                <img src={article.urlToImage} alt={article.title} className="mt-2  h-auto rounded" style={{width:"500px",height:"auto"}} />
              )}
              </div>
            </div>
          ))
        ) : (
          <p>No articles found.</p>
        )}
      </div>
    </div>
  );
};

export default Schemedata;
