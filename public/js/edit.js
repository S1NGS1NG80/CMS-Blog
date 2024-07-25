const postId = document.querySelector('input[name="post-id"]').value;

const editFormHandler = async function (event) {
	event.preventDefault();

	const title = document.querySelector('input[name="post-title"]').value;
	const body = document.querySelector('textarea[name="post-body"]').value;

	await fetch(`/api/post/${postId}`, {
		method: 'PUT',
		body: JSON.stringify({
			title,
			body,
		}),
		headers: {
			'Content-Type': 'application/json',
		},
	});

	document.location.replace('/dashboard');
};

const deleteClickHandler = async function () {
	await fetch(`/api/post/${postId}`, {
		method: 'DELETE',
	});

	document.location.replace('/dashboard');
};

document
	.querySelector('#edit-post-form')
	.addEventListener('submit', editFormHandler);
document
	.querySelector('#delete-btn')
	.addEventListener('click', deleteClickHandler);

// Current dev console errs:
//  GET https://serene-river-60751.herokuapp.com/api/posts/null 404 (Not Found)
// (anonymous)	@	edit.js:5

//  PUT https://serene-river-60751.herokuapp.com/api/posts/null 404 (Not Found)
// (anonymous)	@	edit.js:21

// DELETE https://serene-river-60751.herokuapp.com/api/posts/5 404 (Not Found)
// (anonymous) @ edit.js:40
