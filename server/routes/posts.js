import {} from '../controllers/post.js'
import { verifyToken } from '../middlewares/authorization';

const router = express.router();

// CREATE ROUTE WITH FILE UPLOAD
router.create('', verifyToken);

// READ
router.get('', verifyToken);

// UPDATE
router.put('', verifyToken);

// DELETE
router.delete('', verifyToken);

// exportation
export default router;