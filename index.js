var ab=document.querySelector('[name=\'devh\']');
ab.onclick=function(){
  if(this.checked){
    document.querySelector(".fold[data-name=\""+this.getAttribute('data-for')+"\"]").style.display='block';
  }else{
    document.querySelector(".fold[data-name=\""+this.getAttribute('data-for')+"\"]").style.display='none';
  }
}