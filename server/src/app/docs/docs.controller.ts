import { Request, Response } from 'express'

import asyncHandler from 'express-async-handler'

import { verifyToken } from '../middlewares/auth.middleware'
import { ACCESS } from '../../config/config.auth'
import { prisma } from '../prisma'
import { DocFields, DocsFields } from '../utils/user.utils'

import type { UserDoc } from '../../types/type.docs'
import type { User } from '../../types/type.auth'


export default {
    getDocs: asyncHandler(
        async (req: Request, res: Response) => {
            let access_token
            let docs
            let userFound: User | null = null

            if( req.headers.authorization?.startsWith('Bearer') ) {
                access_token = req.headers.authorization.split( ' ' )[1]
            }
            
            if ( access_token ) userFound = await verifyToken( access_token, ACCESS )
            
            if( userFound ) {
                docs = await prisma.docs.findMany({
                    where: {
                        userId: userFound?.id
                    },
                    select: DocsFields
                })
            }

            res.status( 200 ).json( 
                {   
                    data: docs,
                    message: 'get docs'
                } 
            )
        }
    ),
    getDoc: asyncHandler(
        async (req: Request, res: Response) => {
            const { id } = req.params
            
            const doc = await prisma.docs.findUnique({
                where: {
                    id: Number( id )
                },
                select: DocFields
            })

            res.status( 200 ).json(
                {
                    data: doc,
                    message: 'get doc'
                }
            )
        }
    ),
    updateDocs: asyncHandler( 
        async ( req: Request, res: Response ) => {
            const docs: UserDoc[]  = req.body

            let access_token
            let userFound: User | null = null

            if( req.headers.authorization?.startsWith('Bearer') ) {
                access_token = req.headers.authorization.split( ' ' )[1]
            }
            
            if ( access_token ) userFound = await verifyToken( access_token, ACCESS )

            for (const doc of docs) {
                if (userFound) {
                    await prisma.docs.create({
                        data: {
                            ...doc,
                            userId: userFound?.id
                        }
                    })
                }
            }

            res.status( 200 ).json( { message: 'updated docs' } )
        } 
    ),
    deleteDoc: asyncHandler(
        async (req: Request, res: Response) => {
            const { id } = req.params
            
            await prisma.docs.delete({
                where:{
                    id: Number( id )
                }
            })
            
            res.status( 200 ).json( { message: 'delete doc' } )
        }
    )
}