import React, { useState } from 'react';
import { Post } from '../types/Post';
import classNames from 'classnames';

type Props = {
  posts: Post[];
  handlePostChange: (postId: number | null) => void;
};

export const PostsList: React.FC<Props> = ({ posts, handlePostChange }) => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const handlePostToggle = (post: Post) => {
    if (selectedPost?.id === post.id) {
      setSelectedPost(null);
      handlePostChange(null);
    } else {
      setSelectedPost(post);
      handlePostChange(post.id);
    }
  };

  return (
    <div data-cy="PostsList">
      <p className="title">Posts:</p>

      <table className="table is-fullwidth is-striped is-hoverable is-narrow">
        <thead>
          <tr className="has-background-link-light">
            <th>#</th>
            <th>Title</th>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {posts.map(post => (
            <tr key={post.id} data-cy="Post">
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">{post.title}</td>

              <td className="has-text-right is-vcentered">
                <button
                  onClick={() => handlePostToggle(post)}
                  type="button"
                  data-cy="PostButton"
                  className={classNames('button is-link', {
                    'is-light': selectedPost?.id !== post.id,
                  })}
                >
                  {selectedPost?.id === post.id ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
