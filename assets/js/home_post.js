//this file fetches data from form and send to the action with JSON or using jquery not directly
//so that page wont refresh when post added
{
    //method to submit form data for a new post using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-forms');

        newPostForm.submit(function(e){
            //this prevent default function of the form 
            e.preventDefault();

            //submit form through ajax
            $.ajax({
                type: 'post',
                url: '/post/create',
                //it converts data into JSON form
                data: newPostForm.serialize(),
                success: function(data){
                    // console.log(data);
                    let newPost = newPostDom(data.data.post);
                    //this append the post in the list and prepend show the post at the top
                    $('#post-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));
                    //this is ur post and ur calling the delete button, it will work fine, but when u refresh the page
                    //this new post will become old post and old post ko yeh dletepost function call nhi kara raha h toh ajax se delete nhi hoga
                    new Comments(data.data.post._id);
                    new Noty({
                        theme: 'relax',
                        text:"Post published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();

                },error: function(err){
                    console.log(error.responseText);
                }
            });
        });
    }

    //method to create post in DOM which show post on page and convert text into jquery object

    let newPostDom = function(post){
        return $(`<li id="post-${post._id}">
        <p>
            
                <small>
                   <a class = "delete-post-button" href="/post/destroy/${post._id}">X</a>
               </small> 
                ${post.content}
               <br>
               <small>
                   ${post.user.name}
                </small> 
        </p>
    
    <div class="post-comment">
     
    <form action="/comment/create" method="post" id="post-${post._id}-comments-form">
    <input type="text" name="content" placeholder="Type here to add comment..." required>
    <input type="hidden" name="post" value="${post._id}">
    <input type="submit" value="Add Comment">
    </form>    
    
    <div id="comment-lists">
    <ul id="comment-${post._id}-list">
        
    </ul>
    </div>
    </div>
    </li>`)
 }


//method to delete a post from DOM
    let deletePost = function(deleteLink){
        //delete link is the a tag in post controller file
        console.log($(deleteLink))
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),//prop() help to fetch the href from a tag
                success: function(data){
                    // console.log(data.data, $(`#post-${data.data.post_id}`));
                    $(`#post-${data.data.post_id}`).remove();
                    
                    new Noty({
                        theme: 'relax',
                        text: "Post Deleted!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();

                },error: function(error){
                    console.log(error.responseText);
                }
            });

        });
    }
    createPost();

  
    //function to apply delete to all posts so that whenever u try to delete old post then page wont refresh
    let postToAjax=function()
    {
        
        $("#post-container>ul>li").each(function()
        {
            let self=$(this);// this represent a particular list for a post 
            let deleteButton=$(" .delete-post-button",self);
            console.log(self);
            let id=self.prop("id").split("-")[1];//post-abcdd=>post, abcd
            console.log(id);
            new Comments(id);
            deletePost(deleteButton);
        })
    }
    postToAjax();
    
}