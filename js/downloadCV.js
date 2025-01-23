'use strict'

document.getElementById('downloadCV').addEventListener('click', function(){

    const cvUrl = 'assets/CV-Afonso-Web.pdf';

    const link = document.createElement('a');
    link.href = cvUrl;
    link.download = 'Afonso-CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});