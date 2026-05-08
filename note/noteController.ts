import { Request, Response } from "express";
import noteModel from "./noteModel.js";
import envConfig from "../src/Config/config.js";



const createNote = async (req:Request,res:Response) =>{
 try {
       const file = req.file ? `${envConfig.backendurl}/${req.filename}` : 'https://www.google.com/imgres?q=naruto&imgurl=https%3A%2F%2Feasydrawingguides.com%2Fwp-content%2Fuploads%2F2017%2F05%2Fhow-to-draw-naruto-20.png&imgrefurl=https%3A%2F%2Feasydrawingguides.com%2Fhow-to-draw-naruto%2F&docid=8quJtQcRJGxZYM&tbnid=iwYmBvuJH6tIIM&vet=12ahUKEwjft6Ga1aeUAxXOi2MGHc34EPIQnPAOegQIFxAB..i&w=678&h=600&hcb=2&ved=2ahUKEwjft6Ga1aeUAxXOi2MGHc34EPIQnPAOegQIFxAB'
    const {title,subtitle,description} = req.body
    if (!title || !subtitle || !description){
        res.status(200).json({
            message : "Please provide title,description,subtitle"
        })
        return
    }
    await noteModel.create({
        title,
        subtitle,
        description,
        file
    })
    res.status(201).json({
        message : "Note Created"
    })
 } catch (error) {
     console.log(error)
    
 }
}