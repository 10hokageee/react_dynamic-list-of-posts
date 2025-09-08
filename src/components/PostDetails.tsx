import React, { useEffect, useState } from 'react';
import * as postService from '../services/comments';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';

type Props = {
  selectedPostId: number | null;
  posts: Post[];
};

export const PostDetails: React.FC<Props> = ({ selectedPostId, posts }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [showFrom, setShowForm] = useState(false);

  useEffect(() => {
    if (!selectedPostId) {
      return;
    }

    setLoading(true);
    setShowForm(false);

    postService
      .getComments(selectedPostId)
      .then(commentsFormServer => setComments(commentsFormServer))
      .catch(() => setErrorMessage(true))
      .finally(() => setLoading(false));
  }, [selectedPostId]);

  const findPost = posts.find(post => post.id === selectedPostId);

  const deleteComment = (commentId: number) => {
    postService.deleteComment(commentId);
    setComments(currentComments =>
      currentComments.filter(currentComment => currentComment.id !== commentId),
    );
  };

  const addComment = ({ postId, body, name, email }: Omit<Comment, 'id'>) => {
    postService
      .createComment({ postId, body, name, email })
      .then(newComment => {
        setComments(currentComments => [...currentComments, newComment]);
      });
  };

  const writeComment = () => {
    setShowForm(true);
  };

  return (
    <div className="content" data-cy="PostDetails">
      {selectedPostId && (
        <div className="content" data-cy="PostDetails">
          <div className="block">
            <h2 data-cy="PostTitle">
              {selectedPostId}: {findPost?.title}
            </h2>

            <p data-cy="PostBody">{findPost?.body}</p>
          </div>

          <div className="block">
            {loading && <Loader />}

            {!loading && comments.length === 0 && !errorMessage && (
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
            )}

            {errorMessage && (
              <div className="notification is-danger" data-cy="CommentsError">
                Something went wrong
              </div>
            )}

            {!loading && comments.length > 0 && (
              <>
                <p className="title is-4">Comments:</p>
                {comments.map(comment => (
                  <article
                    key={comment.id}
                    className="message is-small"
                    data-cy="Comment"
                  >
                    <div className="message-header">
                      <a
                        href={`mailto:${comment.email}`}
                        data-cy="CommentAuthor"
                      >
                        {comment.name}
                      </a>
                      <button
                        data-cy="CommentDelete"
                        type="button"
                        onClick={() => deleteComment(comment.id)}
                        className="delete is-small"
                        aria-label="delete"
                      >
                        delete button
                      </button>
                    </div>

                    <div className="message-body" data-cy="CommentBody">
                      {comment.body}
                    </div>
                  </article>
                ))}
              </>
            )}

            {!showFrom && !loading && (
              <button
                data-cy="WriteCommentButton"
                type="button"
                className="button is-link"
                onClick={writeComment}
              >
                Write a comment
              </button>
            )}
          </div>

          {showFrom && (
            <NewCommentForm
              selectedPostId={selectedPostId}
              onSubmit={addComment}
            />
          )}
        </div>
      )}
    </div>
  );
};
