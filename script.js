const postIdInput = document.getElementById('post-id');
const searchButton = document.getElementById('search-btn');
const postContainer = document.getElementById('post-container');

searchButton.addEventListener('click', async () => {
  const postId = postIdInput.value;

  if (!postId) {
    alert('Please enter a post ID.');
    return;
  }

  try {
    const postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    const postData = await postResponse.json();

    if (!postResponse.ok) {
      throw new Error(`Error fetching post: ${postResponse.status}`);
    }

    const commentsResponse = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
    const commentsData = await commentsResponse.json();

    if (!commentsResponse.ok) {
      throw new Error(`Error fetching comments: ${commentsResponse.status}`);
    }

    displayPost(postData, commentsData);

  } catch (error) {
    console.error(error);
    alert('An error occurred while fetching data. Please try again.');
  }
});

function displayPost(post, comments) {
  postContainer.innerHTML = `
    <h2 class="post-title">${post.title}</h2>
    <p>${post.body}</p>
    <div class="comments">
      <h3>Comments</h3>
      ${comments.map(comment => `
        <div class="comment">
          <span class="comment-email">${comment.email}</span>
          <p>${comment.body}</p>
        </div>
      `)}
    </div>
  `;
}
