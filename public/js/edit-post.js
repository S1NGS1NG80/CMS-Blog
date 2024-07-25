const cancelFormHandler = async (event) => {
    event.preventDefault();
    // Go back to dashboard
    document.location.replace('/dashboard');
}


const updateFormHandler = async (event) => {
    event.preventDefault();

    // Get form responses
    const formResponses = {
        id: document.querySelector('#post-id').value.trim(),
        title: document.querySelector('#post-title').value.trim(),
        content: document.querySelector('#post-content').value.trim(),
        category_id: document.querySelector('#post-category').value.trim(),
    }
    
    // Require inputs for title and content // Form is not validating the required fields, probably has to do with the query selector handler on click and not submit on the form
    if (!formResponses.title || !formResponses.content) {
        alert('All fields are required to update the post.');
        return;
    }

    // Update Post content
    const response = await fetch(`/api/posts/${formResponses.id}`, {
        method: 'PUT',
        body: JSON.stringify(formResponses),
        headers: { 'Content-Type': 'application/json' },
    });

    // Display dashboard if okay
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}


const deleteFormHandler = async (event) => {
    event.preventDefault();

    const post_id = document.querySelector('#post-id').value.trim();

    console.log(post_id);

    // Update Post content
    const response = await fetch(`/api/posts/${post_id}`, {
        method: 'DELETE',
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
    .querySelector('.post-update')
    .addEventListener('click', updateFormHandler);


document
    .querySelector('.post-delete')
    .addEventListener('click', deleteFormHandler);