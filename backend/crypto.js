import crypto from 'crypto';

// Générer une clé secrète
const secretKey = crypto.randomBytes(32).toString('hex');

export default secretKey