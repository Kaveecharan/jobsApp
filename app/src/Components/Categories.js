import React, {useState} from 'react'
import JobLists from './JobLists'
import './categories.css'

const Categories = () => {

    const categoriesArray = ['All', 'React', 'Laravel', 'Python', 'React Native']
    const [selectedCategory, setSelectedCategory] = useState(categoriesArray[0])

    const handleCategoryClick =(category)=>{
        setSelectedCategory(category)
    }

  return (
    <div className='homeDiv'>
      <div className='jobListCat'>
        {categoriesArray.map(category => (
          <p
            key={category}
            className={`category ${selectedCategory === category ? 'selected' : ''}`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </p>
        ))}
      </div>
      <JobLists selectedCategory={selectedCategory} />
    </div>
  )
}

export default Categories