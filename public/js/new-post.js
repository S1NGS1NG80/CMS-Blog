const cancelFormHandler = async (event) => {
    event.preventDefault();
    // Go back to dashboard
    document.location.replace('/dashboard');
}


const createFormHandler = async (event) => {
    event.preventDefault();

    // Get form responses
    const formResponse = {
        title: document.querySelector('#post-title').value.trim(),
        content: document.querySelector('#post-content').value.trim(),
        category_id: document.querySelector('#post-category').value.trim(),
    }
    console.log(formResponse);
    // Require inputs for title and content // Form is not validating the required fields, probably has to do with the query selector handler on click and not submit on the form
    if (!formResponse.title || !formResponse.content) {
        alert('All fields are required to create the post.');
        return;
    }

    // Create New Post content
    const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify(formResponse),
        headers: { 'Content-Type': 'application/json' },
    });

    // Display dashboard if okay
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}





document
    .querySelector('.post-cancel')
    .addEventListener('click', cancelFormHandler);


document
    .querySelector('.post-create')
    .addEventListener('click', createFormHandler);


