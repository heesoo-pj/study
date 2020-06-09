var lguPlus = new Vue ({
        el:'#uplus',
        data : {
            gift : '',
            personalPopup : true,
            shopList : [[],[],[]],
            shopChoice : ''
        },
        created:function(){
            this.shopAllList();
        },
        methods:{
            giftCheck:function(idx){ //선택지에 따른 이미지 변경
                var imgUrl = "image/gift-select-"+idx+".png";
                this.gift = imgUrl;
            },
            //popup
            popupOpen:function(flag, dimmedBoolean){
                var scrollTop = $(window).scrollTop() +30;
                var $selector = $('.pop-' + flag);
                var dim = dimmedBoolean;

                //선물 선택이 안됐을 때                
                if(flag == 'personal'){
                    if(this.gift == ''){
                        alert('받고 싶은 선물을 선택해주세요!');      
                        return false;               
                    }   
                } else if(flag == 'shop'){
                    $('.pop-personal').hide();
                    this.personalPopup = false; //true일 때 개인정보 팝업 소스 유무
                }
                if (dimmedBoolean != false) $(".dim").show();
                $selector.css('top', scrollTop + 'px').show();
                

            },
            popupClose:function(flag, dimmedBoolean){
 
                var dim = dimmedBoolean;
                
                if(flag == 'shop') {
                    this.personalPopup = true;
                    $('.pop-personal').show();
                }
                if (dimmedBoolean != false) $(".dim").hide();
                $('.pop-' + flag).hide();
            },
            shopAllList:function(){
                // console.log(this);
                // var self = this;
                $.ajax({
                    type: "GET",
                    dataType:"json",
                    url: "store.json",
                    success:function(data){    
                        // console.log(typeof data);
                        // console.log(this);

                        data.data.forEach(function(data){
                            switch(data.commercialType){
                                case 'STORE': this.shopList[0].push(data);
                                break;
                                case 'OFFICE' : this.shopList[1].push(data);
                                break;
                                case 'RESIDENT_COMPLEX' : this.shopList[2].push(data);
                            }                        
                        }.bind(this));
                    }.bind(this),
                    error:function(){
                        console.log('fail')
                    }
                })
            },
            shopListChoice:function(i){
                console.log(this)
                this.i.forEach(function(i){
                    i.active = false;
                });
                i.active = true;
                this.shopChoice = i.marketName;
            },
            checkForm:function(e){ //form 체크
                e.preventDefault();    
                
                var userAgree = document.field.userAgree; //동의 
                var userAgreeValue = document.field.userAgree.value;   
                //console.log(userAgreeNo)   
                // 개인정보동의 
                // if( !this.userAgree || this.userAgreeNo == 'no' ){
                //     alert('개인정보 수집, 이용, 제공에 동의해주세요.');
                //     document.getElementById('agree-ok').select();
                //     return;
                // } 

                var userName = document.field.personalName; //이름
                if(userName.value == '' || !(userName.value.length >= 3 && userName.value.length <= 12)) {
                    alert("이름을 입력하시오");
                    //document.userName.focus();
                    document.getElementById('personalName').select();
                    return false; // 이름 입력이 안되어 있다면 submint 이벤트를 중지
                }

                var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i; 
                if ( $('$phone').val() =!regExp) {

                    alert("잘못된 휴대폰 번호입니다. 숫자, - 를 포함한 숫자만 입력하세요.");
              
                    return false
              
              }
            
            }

        } //methods
    });

