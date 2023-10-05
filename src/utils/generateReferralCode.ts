function generateReferralCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let referralCode = '';
    
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      const randomChar = characters.charAt(randomIndex);
      referralCode += randomChar;
    }
    // console.log(referralCode)
    return referralCode;    
  }
// generateReferralCode()
export default generateReferralCode;