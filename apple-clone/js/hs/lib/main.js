(() => {
  let yOffset = 0; // window y scroll 값


  // 각 구간의 정보
  const sceneInfo = [
    {
      //0
      type: 'stiky',
      heightNum: 5, // 브라우저 높이의 5배로 scrollHiehgt 세팅
      scrollHight: 0,
      objs: {
        container: document.querySelector('#scroll-section-0')
      }
    },
    {
      //1
      type: 'normal',
      heightNum: 5,
      scrollHight: 0,
      objs: {
        container: document.querySelector('#scroll-section-1')
      }
    },
    {
      //2
      type: 'stiky',
      heightNum: 5,
      scrollHight: 0,
      objs: {
        container: document.querySelector('#scroll-section-2')
      }
    },
    {
      //3
      type: 'stiky',
      heightNum: 5,
      scrollHight: 0,
      objs: {
        container: document.querySelector('#scroll-section-3')
      }
    }
  ];

  //각 스크롤 섹션 높이 세팅
  function setLayoutHeight() {
    for(let i = 0; i < sceneInfo.length; i++) {
      sceneInfo[i].scrollHight = sceneInfo[i].heightNum * window.innerHeight;
      sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHight}px`;
    }
  };

  
  function scrollLoop() {
    
  };



  window.addEventListener('resize', setLayoutHeight);
  setLayoutHeight();

  window.addEventListener('scroll', () => {
    yOffset = window.pageYOffset;

    scrollLoop();
  });

})();