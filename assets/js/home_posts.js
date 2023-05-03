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
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container > ul').prepend(newPost);
                }, error: function(error){
                    console.log(error.responseText);
                }   
            })
        });
    };


    // method to create the post in DOM
    let newPostDom = function(post){
        return $(`<li id="post-${post._id}">
        <p>
    
                <small>
                    <a class="delete-post-button" href="/posts/destroy/${post.id}">
                        <i class="fa-sharp fa-solid fa-trash"></i>
                    </a>
                </small>
                
                    <label for="">
                    ${post.content}
                    </label>
                    <br>
                    <small>
                    ${ post.user.name }
                    
                    </small>
        </p>
    
        <div class="post-comments">
    
                <form action="comments/create" method="post">
                    <input type="text" name="content" placeholder="type here to add comment">
                    <input type="hidden" name="post" value="${ post._id }">
                    <input type="submit" value="Add-comment">
                </form>
    
    
                    <div class="post-comments-list">
                        <ul id="posts-commnets-${ post._id }">
                            
                        </ul>
                    </div>
        </div>
    </li>`)
    }

    createPost();

}