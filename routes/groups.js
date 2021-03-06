import { Router } from 'express'
import * as groupCtrl from '../controllers/groups.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/
router.get('/', groupCtrl.index)

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/:id', checkAuth, groupCtrl.show)
router.get('/:id/posts/:postId', checkAuth, groupCtrl.showPost)
router.post('/', checkAuth, groupCtrl.create)
router.post('/:id/posts', checkAuth, groupCtrl.createPost)
router.post('/:id/posts/:postId/comments', checkAuth, groupCtrl.createComment)
router.put('/:id', checkAuth, groupCtrl.update)
router.put('/:id/posts/:postId', checkAuth, groupCtrl.updatePost)
router.put('/:id/posts/:postId/comments/:commentId', checkAuth, groupCtrl.updateComment)
router.delete('/:id', checkAuth, groupCtrl.delete)
router.delete('/:id/posts/:postId', checkAuth, groupCtrl.deletePost)
router.delete('/:id/posts/:postId/comments/:commentId', checkAuth, groupCtrl.deleteComment)

export { router }