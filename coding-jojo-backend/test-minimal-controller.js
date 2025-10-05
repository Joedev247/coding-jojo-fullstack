// Test minimal controller
const testController = {
  getUserChats: async (req, res) => {
    res.json({ test: 'works' });
  },
  
  createChatSession: async (req, res) => {
    res.json({ test: 'works' });
  }
};

console.log('Test controller created');
console.log('getUserChats type:', typeof testController.getUserChats);
console.log('createChatSession type:', typeof testController.createChatSession);

module.exports = testController;
