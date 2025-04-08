import React from 'react'

const Authors = () => {
    return (
        <div>
      <h1>Authors</h1>

      <form action="/authors" method="post">
        <input type="text" name="authorName" placeholder="Author Name" />
        <button type="submit">Add Author</button>
      </form>



        </div>
    )
}

export default Authors