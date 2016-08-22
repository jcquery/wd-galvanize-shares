import React from 'react';
import Post from './Post';
import PostForm from 'components/PostForm';
import weakKey from 'weak-key';

const Posts = React.createClass({
  render() {
    const { params, editing } = this.props;
    let { posts } = this.props;
    if (params.topic) {
      posts = posts.filter((post) => post.topic === this.props.params.topic);
    }

    posts.sort((postA, postB) => postA.votes < postB.votes);

    return <main>
      {posts.map((post, index) => {
        if (editing === post) {
          return <PostForm
            post={post}
            key={weakKey(post)}
            stopEditingPost={this.props.stopEditingPost}
            updatePost={this.props.updatePost}
            />;
        }

        return <Post
          post={post}
          key={weakKey(post)}
          incrementVotes={this.props.incrementVotes}
          decrementVotes={this.props.decrementVotes}
        />
      })}
    </main>;
  }
});

export default Posts;
