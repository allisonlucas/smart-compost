//IIFE FOR VARIABLE ENCAPSULATION
(function() {
  angular.module('signupModule', [])
    .controller('signUpCtrl', signUpController)

    function signUpController() {
        var sCtrl = this

        sCtrl.show = false
        sCtrl.showFunc = function() {
            sCtrl.show = !sCtrl.show
            if (sCtrl.show === false) {
                sCtrl.button = 'Show form'
            } else {
                sCtrl.button = 'Hide form'
            }
        }
    }

}())
