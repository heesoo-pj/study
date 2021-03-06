(() => {
	let yOffset = 0; //scroll Y 값
	let prevScrollHeight = 0; // 현재 스크롤 위치보다 이전에 위치한 스크롤 섹션의 스크롤 높이합의 값
	let currentScene = 0; //현재 활성화된 scene
	let enterNewScene = false; //새로운 scene이 시작되는 순간 true

	const secenInfo = [
		{
			//0
			type: 'sticky',
			heightNum: 5, //브라우저높이 5배
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-0'),
				messageA: document.querySelector('#scroll-section-0 .main-message.a'),
				messageB: document.querySelector('#scroll-section-0 .main-message.b'),
				messageC: document.querySelector('#scroll-section-0 .main-message.c'),
				messageD: document.querySelector('#scroll-section-0 .main-message.d'),
			},
			values: {
				messageA_opacity: [0, 1, {start:0.1, end:0.2}],
				messageB_opacity: [0, 1, {start:0.3, end:0.4}],
				messageC_opacity: [0, 1, {start:0.5, end:0.6}],
				messageD_opacity: [0, 1, {start:0.7, end:0.8}],
			}
		},
		{
			//1
			type: 'normal',
			heightNum: 2,
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-1')
			}
		},
		{
			//2
			type: 'sticky',
			heightNum: 5,
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-2')
			}
		},
		{
			//3
			type: 'sticky',
			heightNum: 5,
			scrollHeight: 0,
			objs: {
				container: document.querySelector('#scroll-section-3')
			}
		}
	];

	function calcValues(values, currentYOffset){ //currentYOffset은 currentsection에서 스크롤 값
		let rv;
		const scrollHeight = secenInfo[currentScene].scrollHeight
		const scrollRation = currentYOffset / scrollHeight;
		
		if(values.length === 3){ //secenInfo values 의 3번째 배열이 있는경우
			const partScrollStart = values[2].start * scrollHeight;
			const partScrollEnd = values[2].end * scrollHeight;

			const partScrollHeight = partScrollEnd - partScrollStart; //타임라인 구간

			rv =  currentYOffset-partScrollStart/ partScrollHeight * ( values[1]-values[0] + values[0]);


		} else {
			rv = scrollRation * ( values[1]-values[0] + values[0]);
		}

		return rv;
	}

	function setLayout() {//각 scroll section의 높이세팅
		for (let i = 0; i < secenInfo.length; i++) {
			secenInfo[i].scrollHeight = secenInfo[i].heightNum * window.innerHeight;
			secenInfo[i].objs.container.style.height = `${secenInfo[i].scrollHeight}px`;
		};

		//중간에 새로고침 했을 때, currentScene 값 다시 설정.
		yOffset = window.pageYOffset;
		let totalScrollHeight = 0;
		for (let i = 0; i < secenInfo.length; i++) {
			totalScrollHeight += secenInfo[i].scrollHeight;
			if (totalScrollHeight >= yOffset) {
				currentScene = i;
				break;
			}
		}
		document.body.setAttribute('id', `show-scene-${currentScene}`);

	};

	
	function playAnimation() {
		const objs = secenInfo[currentScene].objs;
		const values = secenInfo[currentScene].values;
		const currentYOffset = yOffset - prevScrollHeight;

		switch (currentScene) {
			case 0:
				let messageA_opacity_in = calcValues( values.messageA_opacity, currentYOffset);
				objs.messageA.style.opacity = messageA_opacity_in;
				
				break;
			case 1:
				// console.log('1play')
				break;
			case 2:
				// console.log('2play')
				break;
			case 3:
				// console.log('3play')
				break;
		}
	}


	function scrollLoop() { //scroll할 때 마다 currentScene 찾기
		prevScrollHeight = 0;
		enterNewScene=false;

		for (let i = 0; i < currentScene; i++) {
			prevScrollHeight += secenInfo[i].scrollHeight;
		}

		if (yOffset > prevScrollHeight + secenInfo[currentScene].scrollHeight) {
			enterNewScene = true;
			currentScene++;
			document.body.setAttribute('id', `show-scene-${currentScene}`);
		}
		if (yOffset < prevScrollHeight) {
			if (currentScene === 0) return; //-1이 될 경우를 대비하여 방어막!
			enterNewScene = true;
			currentScene--;
			document.body.setAttribute('id', `show-scene-${currentScene}`);
		}
		if(enterNewScene) return;
		playAnimation(); //enterNewScene가 false면 실행 X
	};


	scrollLoop();

	window.addEventListener('resize', setLayout);
	window.addEventListener('scroll', () => {
		yOffset = window.pageYOffset;
		scrollLoop();
		playAnimation();
	});
	window.addEventListener('load', () => { //DOMContentLoaded : html DOM구조만 load되면 실행
		setLayout();

	})
})();