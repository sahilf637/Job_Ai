const express = require('express');
const candidateController = require('../controllers/candidateController');

const router = express.Router();

router.post('/', candidateController.createCandidate);
router.get('/', candidateController.getAllCandidates);
router.get('/:id', candidateController.getCandidateById);
router.put('/:id', candidateController.updateCandidate);
router.delete('/:id', candidateController.deleteCandidate);

module.exports = router;
