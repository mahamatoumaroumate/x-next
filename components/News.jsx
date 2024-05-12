'use client'

import { useEffect, useState } from 'react'

const News = () => {
  const [news, setNews] = useState([])
  const [articleNum, setArticleNum] = useState(3)
  useEffect(() => {
    fetch('https://saurav.tech/NewsAPI/top-headlines/category/business/us.json')
      .then((res) => res.json())
      .then((data) => {
        setNews(data.articles)
      })
  }, [])
  return (
    <div className='text-gray-700 bg-gray-100 space-y-3 rounded-xl pt-2 '>
      <h4 className='font-bold text-xl px-4 '>Whats happening</h4>
      {news.slice(0, articleNum).map((article, index) => {
        return (
          <div key={index}>
            <a href={article.url} target='_blank'>
              <div className='flex items-center justify-between px-4 py-2 space-x-1 hover:bg-gray-200 transition duration-200'>
                <div className='space-y-0.5'>
                  <h6 className='text-sm font-bold'>{article.title}</h6>
                  <p className='text-xs font-medium text-gray-50'>
                    {article.source.name}
                  </p>
                </div>
                <img
                  src={article.urlToImage}
                  width={70}
                  className='rounded-xl'
                />
              </div>
            </a>
          </div>
        )
      })}
      <button
        onClick={() => setArticleNum(articleNum + 3)}
        className='w-full py-2 bg-gray-200 hover:bg-gray-300 transition duration-200'
      >
        Load More
      </button>
    </div>
  )
}
export default News
