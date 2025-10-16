<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  isActive: boolean;
}

const posts = ref<Post[]>([]);
const newPost = ref({
  title: '',
  content: ''
});
const errorMessage = ref<string | null>(null); // Reactive variable for error messages

const fetchPosts = async () => {
  try {
    const response = await axios.get('/api/posts');
    posts.value = response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    errorMessage.value = 'Failed to fetch posts.';
  }
};

const createPost = async () => {
  errorMessage.value = null; // Clear previous error message
  try {
    await axios.post('/api/posts', newPost.value);
    newPost.value.title = '';
    newPost.value.content = '';
    fetchPosts(); // Refresh the posts list
  } catch (error) {
    console.error('Error creating post:', error);
    errorMessage.value = 'Failed to create post. Please try again.';
  }
};

const deletePost = async (id: string) => {
  try {
    await axios.delete(`/api/posts/${id}`);
    fetchPosts(); // Refresh the posts list
  } catch (error) {
    console.error('Error deleting post:', error);
    errorMessage.value = 'Failed to delete post.';
  }
}

onMounted(() => {
  fetchPosts();
});
</script>

<template>
  <div class="container">
    <h1>My Blog</h1>

    <div class="form-container">
      <h2>Create a New Post</h2>
      <form @submit.prevent="createPost">
        <input type="text" v-model="newPost.title" placeholder="Post Title" required />
        <textarea v-model="newPost.content" placeholder="Post Content" required></textarea>
        <button type="submit">Create Post</button>
      </form>
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
    </div>

    <div class="posts-container">
      <h2>Posts</h2>
      <div v-if="posts.length === 0" class="no-posts">
        No posts yet. Be the first to create one!
      </div>
      <div v-else class="post" v-for="post in posts" :key="post.id">
        <h3>{{ post.title }}</h3>
        <p>{{ post.content }}</p>
        <button class="delete-btn" @click="deletePost(post.id)">Delete</button>
      </div>
    </div>
  </div>
</template>

<style>
body {
  font-family: sans-serif;
  background-color: #f4f4f9;
  color: #333;
  margin: 0;
  padding: 2rem;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h1, h2 {
  color: #333;
}

.form-container {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background-color: #f9f9f9;
  border-radius: 8px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

input[type="text"],
textarea {
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

button {
  padding: 0.8rem 1.2rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}

.posts-container {
  margin-top: 2rem;
}

.no-posts {
  text-align: center;
  color: #777;
  font-style: italic;
}

.post {
  background-color: #f9f9f9;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  position: relative;
}

.post h3 {
  margin: 0 0 0.5rem;
}

.delete-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: #dc3545;
  font-size: 0.8rem;
  padding: 0.4rem 0.8rem;
}

.delete-btn:hover {
  background-color: #c82333;
}

.error-message {
  color: red;
  margin-top: 1rem;
  text-align: center;
}
</style>
