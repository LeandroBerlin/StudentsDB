const Student = require('../models/students.model.js');

exports.create = function(req, res) {
    // Create and Save a new Student
    if(!req.body) {
        res.status(400).send({message: "Student can not be empty"});
    }

     newStudent = new Student(req.body);
      newStudent.save(function(err) {
        if(err) {
          return res.send(err);
        }
        
        return res.send({message: "Student created successfully!"})
    });
};

exports.findAll = function(req, res) {
    // Retrieve and return all students from the database.
    Student.find(function(err, students){
        if(err) {
            res.status(500).send({message: "Some error ocuured while retrieving students."});
        } else {
            res.send(students);
        }
    });
};

exports.findOne = function(req, res) {
    //  Retrieve one user by ID
    Student.findById(req.params.studentId, function(err, student) {
        if(err) {
            res.status(500).send({message: "Could not retrieve student with id " + req.params.studentId});
        } else {
            res.send(student);
        }
    });
};

exports.update = function(req, res) {
    // Update a student identified by the studentId in the request
    Student.findById(req.params.studentId, function(err, student) {
      if(!student)
        return res.send({message: "Student not found!"});

      // Check all params that are set in req.body and attach/overwrite the student object
      for(attr in req.body) {
        student[attr] = req.body[attr];
      }

      student.save(function(err) {
        if(err) {
          return res.send(err);
        }
        return res.send({message: "Student updated successfully!"});
      });
    });
};

exports.delete = function(req, res) {
    // Delete a student with the specified studentId in the request
    Student.remove({_id: req.params.studentId}, function(err, data) {
        if(err) {
            res.status(500).send({message: "Could not delete student with id " + req.params.id});
        } else {
            res.send({message: "Student deleted successfully!"})
        }
    });
};

