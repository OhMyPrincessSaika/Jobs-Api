const express = require('express');
const router = express.Router();

const {createJob,updateJob,deleteJob,getAllJobs,getJob} = require('../controllers/jobs');

router.route('/').post(createJob).get(getAllJobs);
router.route('/:id').patch(updateJob).delete(deleteJob).get(getJob);

module.exports = router;