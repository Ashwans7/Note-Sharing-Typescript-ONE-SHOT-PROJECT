import { NextFunction, Request, Response } from "express";
import noteModel from "./noteModel.js";
import envConfig from "../src/Config/config.js";
import createHttpError from "http-errors";

const createNote = async (req:Request,res:Response,next:NextFunction)=>{
   try {
    const file = req.file ? `${envConfig.backendurl}/${req.file.filename}` : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGdn5ODMa1UxSL5a172LJpZn6EjIX5THCdmA&s'
    const {title,subtitle,description} = req.body 
    if(!title || !subtitle || !description ){
        res.status(400).json({
            message : "Please provide title,subtitle,description"
        })
        return
    }
    await noteModel.create({
        title, 
        subtitle, 
        description , 
        file
    })

    res.status(200).json({
      message: "Note Created",
    });

  } catch (error) {
    console.log(error);

    return next(
      createHttpError(500, "Error while creating")
    );
  }
};
//allnotes
const listNotes = async(req:Request,res:Response,next:NextFunction)=>{
   try {
     const notes = await noteModel.find()
    res.status(200).json({
        message : "Notes Fetched",
        data : notes
    })
   } catch (error) {
    return next(createHttpError(500,"Error while fetching"))
   }
}
//singlenotes
const listNote = async(req:Request,res:Response,next:NextFunction)=>{
   try {
    const {id} = req.params
     const note = await noteModel.findById(id)
     if(!note){
        return next(createHttpError(404,"Note not found with the given id"))
     }
    res.status(200).json({
        message : "Notes Fetched",
        data : note
    })
   } catch (error) {
    return next(createHttpError(500,"Error while fetching"))
   }
}

const deleteNote = async(req:Request,res:Response,next:NextFunction)=>{
   try {
    const {id} = req.params
     await noteModel.findByIdAndDelete(id)
    res.status(200).json({
        message : "Notes deleted"
    })
   } catch (error) {
    return next(createHttpError(500,"Error while fetching"))
   }
}

// const  updateNote = async(req:Request,res:Response,next:NextFunction)=>{
//     try {
//         const {id} = req.params
//        const updatedNotes = await noteModel.findByIdAndUpdate()
//        res.status(200).json({
//         message : "Notes Updated",
//         data : updatedNotes
//        })
        
//     } catch (error) {
//         return
//         next(createHttpError(500,"Error while fetching"))
        
//     }
// }


export { createNote,listNote,listNotes,deleteNote };