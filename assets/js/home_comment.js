class Comments{

    constructor(postID)
    {
        this.postID=postID;
        this.postContainer=$(`#post-${postID}`)
        console.log(this.postContainer)
        this.commentCreate(postID);
        let self=this;
        $(" .delete-comment-button",this.postContainer).each(function()
        {
            console.log("deleting comments",$(this));
           self.deleteComment($(this));
        })
    }
    commentCreate(postID){
        console.log(postID);
        let newComment = $(`#post-${postID}-comments-form`);
        let self=this;
        console.log(newComment);
        newComment.submit(function(e){
            e.preventDefault();

            $.ajax({
                type:'post',
                url: '/comment/create',
                data: newComment.serialize(),
                success: function(data){
                    console.log(data.data)
                    let newComments = self.newCommentDom(data.data.comment);
                    
                    $(`#comment-${postID}-list`).prepend(newComments);
                    self.deleteComment($(" .delete-comment-button",newComments))
                    

                },error: function(error){
                    console.log(error.responseText);
                }

            });
        });
    }

    newCommentDom(comment){
        return $(`<li id="comment-${comment._id}">
        <p>
            
                <small>
                    <a class = "delete-comment-button" href="/comment/destroy/${comment._id}">X</a>
                </small> 
    
            ${ comment.content}
            <br>
            <small>
                ${ comment.user.name}
            </small>
        </p>
    </li>
    `)
    } 

    deleteComment(deleteLink){
        //delete link is the a tag in post controller file
        console.log($(deleteLink))
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),//prop() help to fetch the href from a tag
                success: function(data){
                    console.log(data.data, $(`#comment-${data.data.comment_id}`));
                    $(`#comment-${data.data.comment_id}`).remove();
                    
                    
                },error: function(error){
                    console.log(error.responseText);
                }
            });

        });
    }

    

    

}