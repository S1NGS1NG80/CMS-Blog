const cancelFormHandler = async (event) => {
    event.preventDefault();

    const id = document.querySelector('#post-id').value.trim();

    // Go back to dashboard
    document.location.replace(`/post/${id}`);
}


const submitFormHandler = async (event) => {
    event.preventDefault();

    const id = document.querySelector('#post-id').value.trim();

    // Get form responses
    const formResponse = {
        post_id: id,
        content: document.querySelector('#comment-content').value.trim(),
    }
    console.log(formResponse);
    // Require inputs for title and content // Form is not validating the required fields, probably has to do with the query selector handler on click and not submit on the form
    if (!formResponse.content) {
        alert('All fields are required to create the post.');
        return;
    }

    // Create New Post content
    const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify(formResponse),
        headers: { 'Content-Type': 'application/json' },
    });

    // Display dashboard if okay
    if (response.ok) {
        document.location.replace(`/post/${id}`);
    } else {
        alert(response.statusText);
    }
}





document
    .querySelector('.comment-cancel')
    .addEventListener('click', cancelFormHandler);


document
    .querySelector('.comment-submit')
    .addEventListener('click', submitFormHandler);


