const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();
const PORT = 4000;

// Enable CORS
app.use(cors({
    origin: 'http://localhost:3000', // Frontend origin
    credentials: true, // Allow cookies
    
}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  
  // If preflight request, return early
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

// Proxy requests to chapter-service
app.use('/chapter-gateway', createProxyMiddleware({
    target: 'http://chapter-service:3001', // Internal service name and port
    changeOrigin: true,
    pathRewrite: { '^/chapter-gateway': '' }, // Remove /chapter-gateway prefix before forwarding
      onProxyRes: (proxyRes, req, res) => {
    proxyRes.headers['access-control-allow-origin'] = 'http://localhost:3000';
    proxyRes.headers['access-control-allow-credentials'] = 'true';
  }
}));

// Proxy requests to roadmap-service
app.use('/roadmap-gateway', createProxyMiddleware({
    target: 'http://roadmap-service:3002', // Internal service name and port
    changeOrigin: true,
    pathRewrite: { '^/roadmap-gateway': '' }, // Remove /chapter-gateway prefix before forwarding
      onProxyRes: (proxyRes, req, res) => {
    proxyRes.headers['access-control-allow-origin'] = 'http://localhost:3000';
    proxyRes.headers['access-control-allow-credentials'] = 'true';
  }
}));

// Proxy requests to level-service
app.use('/level-gateway', createProxyMiddleware({
    target: 'http://level-service:3003', // Internal service name and port
    changeOrigin: true,
    pathRewrite: { '^/roadmap-gateway': '' }, // Remove /chapter-gateway prefix before forwarding
      onProxyRes: (proxyRes, req, res) => {
    proxyRes.headers['access-control-allow-origin'] = 'http://localhost:3000';
    proxyRes.headers['access-control-allow-credentials'] = 'true';
  }
}));


// Start the API Gateway
app.listen(PORT, () => {
    console.log(`API Gateway is running on http://localhost:${PORT}`);
});