import { Request, Response } from 'express';
import { Post } from '../models/post.model';
import * as firestoreService from '../services/firestore.service';
import { Logger } from '../core/logger';

const POSTS_COLLECTION = 'posts';

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await firestoreService.getAllDocuments<Post>(POSTS_COLLECTION);
    Logger.info('Successfully fetched all posts', { count: posts.length });
    res.status(200).json(posts);
  } catch (error) {
    Logger.error('Error fetching posts', { error: error.message });
    res.status(500).send(error.message);
  }
};

export const getPostById = async (req: Request, res: Response) => {
  try {
    const post = await firestoreService.getDocumentById<Post>(
      POSTS_COLLECTION,
      req.params.id
    );
    if (post) {
      Logger.info(`Successfully fetched post with ID: ${req.params.id}`, { postId: req.params.id });
      res.status(200).json(post);
    } else {
      Logger.warn(`Post not found with ID: ${req.params.id}`, { postId: req.params.id });
      res.status(404).send('Post not found');
    }
  } catch (error) {
    Logger.error(`Error fetching post with ID: ${req.params.id}`, { postId: req.params.id, error: error.message });
    res.status(500).send(error.message);
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;
    const newPostData: Omit<Post, 'id'> = {
      title,
      content,
      createdAt: new Date(),
      isActive: true,
    };
    const newPost = await firestoreService.createDocument<Post>(
      POSTS_COLLECTION,
      newPostData
    );
    Logger.info('Successfully created new post', { postId: newPost.id, title: newPost.title });
    res.status(201).json(newPost);
  } catch (error) {
    Logger.error('Error creating post', { body: req.body, error: error.message });
    res.status(500).send(error.message);
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const post = await firestoreService.getDocumentById<Post>(
      POSTS_COLLECTION,
      id
    );

    if (post) {
      await firestoreService.updateDocument<Post>(POSTS_COLLECTION, id, {
        title,
        content,
      } as Partial<Post>);
      Logger.info(`Successfully updated post with ID: ${id}`, { postId: id, updatedFields: { title, content } });
      res.status(200).json({ id, title, content });
    } else {
      Logger.warn(`Post not found for update with ID: ${id}`, { postId: id, body: req.body });
      res.status(404).send('Post not found');
    }
  } catch (error) {
    Logger.error(`Error updating post with ID: ${req.params.id}`, { postId: req.params.id, body: req.body, error: error.message });
    res.status(500).send(error.message);
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const post = await firestoreService.getDocumentById<Post>(
      POSTS_COLLECTION,
      id
    );

    if (post) {
      await firestoreService.softDeleteDocument(POSTS_COLLECTION, id);
      Logger.info(`Successfully deleted post with ID: ${id}`, { postId: id });
      res.status(200).send('Post deleted successfully');
    } else {
      Logger.warn(`Post not found for deletion with ID: ${id}`, { postId: id });
      res.status(404).send('Post not found');
    }
  } catch (error) {
    Logger.error(`Error deleting post with ID: ${req.params.id}`, { postId: req.params.id, error: error.message });
    res.status(500).send(error.message);
  }
};
