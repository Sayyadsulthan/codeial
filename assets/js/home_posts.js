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
                success: function (data) {
                    console.log(data);
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container > ul').prepend(newPost);

                    // using NOTY for display message
                    new Noty({

                        theme: 'relax',
                        type: 'success',
                        text: "post created! :)",
                        layout: 'topRight',
                        timeout: 1500
        
                    }).show();


                    // // to delete post from DOM
                    deletePost($(' .delete-post-button', newPost))
                }, error: function (error) {
                    console.log(error.responseText);
                }
            })
        });

    };


    // method to create the post in DOM
    let newPostDom = function (post) {
        return $(`<li id="post-${post._id}">
        <p>
    
                <small>
                    <a class="delete-post-button" href="/posts/destroy/${post._id}">
                        <i class="fa-sharp fa-solid fa-trash"></i>
                    </a>
                </small>
                
                    <label for="">
                    ${post.content}
                    </label>
                    <br>
                    <small>
                    ${post.user.name}
                    
                    </small>
        </p>
    
        <div class="post-comments">
    
                <form action="comments/create" method="post">
                    <input type="text" name="content" placeholder="type here to add comment">
                    <input type="hidden" name="post" value="${post._id}">
                    <input type="submit" value="Add-comment">
                </form>
    
    
                    <div class="post-comments-list">
                        <ul id="posts-commnets-${post._id}">
                            
                        </ul>
                    </div>
        </div>
    </li>`)
    }


    

    // method to delete a post from DOM
    let deletePost = function (deleteLink) {
        $(deleteLink).click(function (e) {
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: async function (data) {
                    console.log(data);
                    await $(`#post-${data.data.post_id}`).remove();

                     // using NOTY for display message
                     new Noty({

                        theme: 'relax',
                        type: 'error',
                        text: "post deleted!",
                        layout: 'topRight',
                        timeout: 1500
        
                    }).show();

                }, error: function (error) {
                    console.log(error.responseText);
                }
            })
        })
    }

    // for traverse all li from DOM #posts-list-container > ul >li
    let allpost = $('#posts-list-container > ul >li');
    
    for (let post of allpost) {
        // to delete post from DOM
        // console.log("for inside");
        console.log($(' .delete-post-button', post," 1"));
        deletePost($(' .delete-post-button', post))
    }

    createPost();

}
