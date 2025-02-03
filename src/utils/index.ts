  //populates animation field 
  export const setValidAnimation = (animation, validAnimations, setAnimation) => {
    if (!validAnimations.includes(animation)) {
      setAnimation("Idle");
      return
    }
    setAnimation(animation);

  }

  // populates fcial expression field
  export const setValidFacialAnimation = (facialAnimation,validFacials, setFacialExpression) => {
    if (!validFacials.includes(facialAnimation)) {
      setFacialExpression("default");
      return
    }
    setFacialExpression(facialAnimation);

  }