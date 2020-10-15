import { ErrorRequestHandler } from 'express'
import { ValidationError } from 'yup';

interface ValidationErrors {
    [key: string]: string[];
}

const errorHandler: ErrorRequestHandler  = (error, request, response, next) => {
    console.log(error);

    if(error instanceof ValidationError ) {
        let errors: ValidationErrors = {};

        error.inner.map(error => { errors[error.path] = error.errors });

        return response.status(400).json({ message: 'Validation fails', errors})
    }

    return response.status(500).json({ message: 'internal sever error' });
}

export default errorHandler;