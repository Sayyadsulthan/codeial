{
    // method to submit the form data for new post using ajax
    let createPost = function () {
        console.log("hello");
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function (e) {
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    console.log(data);
                }, error: function(error){
                    console.log(error.responseText);
                }
            })
        });
    };


    // method to create the post in DOM


    createPost();

}