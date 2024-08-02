import jwt from "jsonwebtoken";
import { TOKEN_SECRET, TOKEN_SECRET_CLIENTE } from "../database/config.js";

export const isAuth = (req, res, next) => {
    try {
        const { token_admin } = req.cookies;

        if (!token_admin)
            return res.redirect('/')
        // .status(401)
        // .json({ message: "No token, authorization denied" });

        jwt.verify(token_admin, TOKEN_SECRET, (error, user) => {
            if (error) {
                return res.redirect('/')
                // return res.status(401).json({ message: "Token is not valid" });
            }
            req.user = user;
            next();
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const isAuth_cliente = (req, res, next) => {
    try {
        const { token_cliente } = req.cookies;

        if (!token_cliente)
            return res.redirect('/')
        // .status(401)
        // .json({ message: "No token, authorization denied" });

        jwt.verify(token_cliente, TOKEN_SECRET_CLIENTE, (error, cliente) => {
            if (error) {
                return res.redirect('/')
                // return res.status(401).json({ message: "Token is not valid" });
            }
            req.cliente = cliente;
            next();
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};