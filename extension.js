'use strict';

/**
 * @var Системные, на них завязан некоторый функционал
 */
var queryIsSimple = /^(#?[\w-]+|\.[\w-.]+)$/, eventsList = [], storageCache = _getStorage(), content;

/* Очистка консоли от мусора */
console.clear();

/* Ну расширение почти загружено */
document.body.style.opacity = 1;

/**
 * Тут заполнять фичи титулов
 */
var userTitles = {
	'Aлександр': {
		name: '<strong>Создатель MipedSmiles</strong>'
	},
	'Negezor': {
		background: {
			name: 'negezor.png'
		}
	},
	'AnotherOne': {
		name: 'Генерал канавы',
		background: {
			name: 'anotherone.png'
		}
	},
	'Occultist': {
		name: '<strong>ღ♥</strong>',
		background: {
			name: 'occulist.gif'
		}
	},
	'flnn_human': {
		background: {
			name: 'flnn_human.gif'
		}
	},
	'Lynxire': {
		name: '<strong>Грибная богиня</strong>',
		background: {
			name: 'lynxire.png'
		}
	},
	'bold222': {
		background: {
			name: 'bold222.jpg'
		}
	},
	'_Trader Milk_': {
		name: '<strong>трапоняшка</strong>',
		background: {
			name: 'trader_milk.gif'
		}
	},
	'Dany1508': {
		name: '<strong>ТОПОВЫЙ КУН</strong>',
		background: {
			name: 'dany1508.jpg'
		}
	},
	'Logequm': {
		background: {
			name: 'logequm.gif'
		}
	},
	'XUYAch19': {
		name: '<strong>дошик</strong>',
		background: {
			name: 'huyach19.png'
		}
	},
	'flind.exe': {
		background: {
			name: 'flind_exe.gif'
		}
	},
	'Mgman': {
		background: {
			name: 'mgman.png'
		}
	}
};

/**
 * Тут список автозамены смайлов
 */
var smilies = {
    ':D': 'https://vk.com/images/emoji/D83DDE02.png',
	':\\(': 'http://vk.com/images/emoji/D83DDE12.png',
	':\\)': 'http://vk.com/images/emoji/263A.png',
	':o': 'https://vk.com/images/emoji/D83DDE31.png',
	':\\*': 'https://vk.com/images/emoji/D83DDE18.png',
	'4Head': 'https://static-cdn.jtvnw.net/emoticons/v1/354/1.0',
	'BabyRage': 'https://static-cdn.jtvnw.net/emoticons/v1/22639/1.0',
	'FailFish': 'https://static-cdn.jtvnw.net/emoticons/v1/360/1.0',
	'huiBunt': 'https://static-cdn.jtvnw.net/emoticons/v1/87532/1.0',
	'322': 'https://static-cdn.jtvnw.net/emoticons/v1/28048/1.0',
	'Keepo': 'https://static-cdn.jtvnw.net/emoticons/v1/1902/1.0',
	'BibleThump': 'https://static-cdn.jtvnw.net/emoticons/v1/86/1.0',
	'deIlluminati': 'https://static-cdn.jtvnw.net/emoticons/v1/46248/1.0',
	'KappaClaus': 'https://static-cdn.jtvnw.net/emoticons/v1/74510/1.0',
	'KappaPride': 'https://static-cdn.jtvnw.net/emoticons/v1/55338/1.0',
	'KappaHD': 'https://static-cdn.jtvnw.net/jtv_user_pictures/emoticon-2867-src-f02f9d40f66f0840-28x28.png',
    'kappa': 'https://static-cdn.jtvnw.net/emoticons/v1/25/1.0',
	'WutFace': 'https://static-cdn.jtvnw.net/emoticons/v1/28087/1.0',
	'ANELE': 'https://static-cdn.jtvnw.net/emoticons/v1/3792/1.0',
	'::ru': 'http://vk.com/images/emoji/D83CDDF7D83CDDFA.png',
	'::ua': 'http://vk.com/images/emoji/D83CDDFAD83CDDE6.png',
	'::by': 'http://vk.com/images/emoji/D83CDDE7D83CDDFE.png',
	'::kz': 'http://vk.com/images/emoji/D83CDDF0D83CDDFF.png',
	'спасибо': 'https://static-cdn.jtvnw.net/emoticons/v1/15020/1.0',
	'duckFace': 'https://static-cdn.jtvnw.net/emoticons/v1/50017/1.0',
	'butthurt': 'https://static-cdn.jtvnw.net/emoticons/v1/85693/1.0',
	'gg': 'https://static-cdn.jtvnw.net/emoticons/v1/55571/1.0',
	'EleGiggle': 'https://static-cdn.jtvnw.net/emoticons/v1/4339/1.0',
	'SwiftRage': 'https://static-cdn.jtvnw.net/emoticons/v1/34/1.0',
	'VoteYea': 'https://static-cdn.jtvnw.net/emoticons/v1/106293/1.0',
	'VoteNay': 'https://static-cdn.jtvnw.net/emoticons/v1/106294/1.0',
	'хмм': 'https://static-cdn.jtvnw.net/emoticons/v1/40073/1.0',
	'хм': 'https://static-cdn.jtvnw.net/emoticons/v1/40073/1.0',
	'hype': 'https://static-cdn.jtvnw.net/emoticons/v1/50739/1.0',
	'хайп': 'https://static-cdn.jtvnw.net/emoticons/v1/50739/1.0'
};

/**
 * ----
 *
 * Определение некоторых элементов форума
 *
 * ----
 */

var controllers = {
	conversation: 'переписка с пользователем',
	conversations: 'список переписок',
	members: 'список пользователей',
	member: 'страница пользователя',
	threads: 'тема обсуждения',
	search: 'страница поиска',
	main: 'главная страница'
};

var controller = /\/f\/([^/]+)/i.exec(window.location.pathname);
var params = /(\w+)\.(\d+)/i.exec(window.location.pathname);

if (controller === null) {
	controller = 'main';
} else {
	controller = controller[1];
}

if (params !== null) {
	params.shift();

	if (controller === 'members') {
		controller = 'member';
		controllers.member += ' '+params[0];
	}

	if (controller === 'conversations') {
		controller = 'conversation';
	}
}

log('Открыта «'+(controllers[controller] || 'неизвестная страница')+'»');

var isDarkTheme = (function(){
	var choosers = $$('footer .choosers a');

	if (1 in choosers) {
		return choosers[1].innerHTML === 'miped.ru dark';
	}

	return getStorage('theme',false);
})();

setStorage('theme',isDarkTheme);

log('Активирована «'+(isDarkTheme?'тёмная':'светлая')+'» тема');

$('html').classList.add(isDarkTheme?'miped-theme-dark':'miped-theme-light');

/**
 * ----
 *
 * Титулы
 *
 * ----
 */

var messageList = $('#messageList');
if (['threads','conversation'].indexOf(controller) > -1 && messageList) {
	$$('.message',messageList).forEach(updatePostTitle);

	var observerNewMessage = new MutationObserver(function(mutations){
		$$('.message',messageList).forEach(updatePostTitle);
	});

	observerNewMessage.observe(messageList,{
		childList: true
	});
}

/**
 * Обновляет пост под юзера
 *
 * @param object post
 */
function updatePostTitle (post) {
	if (post.classList.contains('miped-processed')) {
		return;
	}

	var tooltip = $('.Tooltip',post);

	if (tooltip !== null) {
		tooltip.style.display = 'none';
		$('.avatar',post).classList.add('miped-avatar-online');
	}

	post.classList.add('miped-processed');

	var plusRep = $('.pairsInlineplus img',post);

	/* В любом случае нельзя поставить себе +rep) */
	if (plusRep !== null) {
		plusRep.src = getURL('/images/plus-reputation.png');
	} else {

	}

	var minusRep = $('.pairsInlineminus img',post);

	if (minusRep !== null) {
		minusRep.src = getURL('/images/minus-reputation.png');
	}

	var name = post.getAttribute('data-author');

	if (!(name in userTitles)) {
		return;
	}

	var user = userTitles[name];

	var em = createElement('em',{
		class: 'userBanner bannerStaff wrapped mipedCreator'
	});

	em.innerHTML = '<span class="before"></span>'+(user.name || '<div class="miped-titles-extend"></div>')+'<span class="after"></span>';

	if ('background' in user) {
		var background = null;

		if ('url' in user.background) {
			background = 'url('+user.background.url+')';
		} else if ('name' in user.background) {
			background = 'url('+getURL('/images/banner/'+user.background.name)+')';
		} else if ('color' in user.background) {
			background = user.background.color;
		}

		if (background !== null) {
			em.style.background = background;
		}
	}

	if ('emHandler' in user) {
		user.emHandler(em);
	}

	$('.userText',post).appendChild(em);

	if ('postHandler' in user) {
		user.postHandler(post);
	}
}

/**
 * ----
 *
 * Интерфейс настроек с боку (но пико)
 *
 * ----
 */

fetch(getURL('/assets/settings.html'),{
	credentials: 'include'
})
.then(function(response){
	return response.text();
})
.then(function(template){
	document.body.insertBefore(parseHTML(template),document.body.firstChild);

	var isEnabledVk = putStorage('vk',true);
	var isEnabledTwitch = putStorage('twitch',true);
	var isEnabledAnimenu = putStorage('animenu',false);
	var isEnabledAutoReplace = putStorage('autoreplace',true);
	var isEnabledMinusRep = putStorage('minusrep',false);

	log('Emoji вконтакте «'+(isEnabledVk?'включены':'выключены')+'»');
	log('Emoji твича «'+(isEnabledTwitch?'включены':'выключены')+'»');
	log('Аниме меню «'+(isEnabledAnimenu?'включено':'выключено')+'»');
	log('Автозамена слов «'+(isEnabledAutoReplace?'включена':'выключена')+'»');
	log('Изменение репутации «'+(isEnabledMinusRep?'включено':'выключено')+'»');

	$('#nt').src = getURL('/images/'+(isEnabledAnimenu?'animenu':'menu')+'.png');

	var smilePanel = $('#smile_panel');

	$$('input',smilePanel).forEach(function(input){
		input.checked = getStorage(input.dataset.setting,false);
	});

	on(smilePanel,'change','input',function(event){
		setStorage(event.target.dataset.setting,event.target.checked);
	});
	
	if (isEnabledMinusRep) { // не забыть убрать, и сделать через класс
		var styleRep = document.createElement('style');
		styleRep.type = 'text/css';
		styleRep.innerHTML = '.xenOverlay .ctrlUnit li {'
				+ 'position: relative; overflow: auto!important;'
				+ 'height: auto!important; width: auto!important;'
				+ 'right: 0!important; opacity: 1!important; }';
		document.head.appendChild(styleRep);
	}
	
	var bodyFrame = window.frames[0].document.body;
	
	if (isEnabledAutoReplace) {
		on('#QuickReply','mouseover','.button',function(){
			content = bodyFrame.innerHTML;

			for (var key in smilies) {
				content = content.replace(
					new RegExp(' '+key,'ig'),
					'<img src="'+smilies[key]+'" class="miped-smile">'
				);
			}

			bodyFrame.innerHTML = content;
		});
	}
});

/**
 * ----
 *
 * Собственно сама установка нормальных emoji
 *
 * ----
 */

 if (['threads','conversation','posts'].indexOf(controller) > -1) {
	fetch(getURL('/assets/smiles.txt'))
	.then(function(response){
		return response.text();
	})
	.then(function(smilesList){
		smilesList = smilesList.trim();

		var fragmentSmiles = document.createDocumentFragment();

		appendSmiles('vk');
		appendSmiles('twitch');

		var ul = createElement('ul',{
			id: 'SmilieCategories1462645490',
			class: 'primaryContent smilieContainer'
		});
		var li = createElement('li',{
			class: 'smilieCategory'
		});

		li.appendChild(fragmentSmiles);
		ul.appendChild(li);

		log('Emoji загружены и распарсены!');

		on(document.body,'click','.redactor_btn_smilies',function(event){
			var redactorBox = event.target.closest('.redactor_box');

			var interval = setInterval(function(){
				var redactor = $('.redactor_smilies',redactorBox);

				if (redactor === null) {
					return;
				}

				clearInterval(interval);

				redactor.innerHTML = '';
				redactor.appendChild(ul);
			},500);
		});

		function appendSmiles (name) {
			var fragment = document.createDocumentFragment();

			var devider = createElement('div',{
				class: 'miped-smile-devider'
			});

			if (getStorage(name,true)) {
				fragment.appendChild(getImg(getURL('/images/'+name+'.png')));

				parseBlockSmile(name,smilesList)
				.forEach(function(src){
					var li = createElement('li',{
						'data-text': '',
						class: 'Smilie'
					});
					li.appendChild(getImg(src));

					fragment.appendChild(li);
				});
			} else {
				fragment.appendChild(getImg(getURL('/images/'+name+'_off.png')));
			}

			devider.appendChild(fragment);

			fragmentSmiles.appendChild(devider);
		}

		function getImg (src) {
			return createElement('img',{
				src: src,
				class: 'miped-smile'
			});
		}
	});
}

/**
 * Парсирит блок со смайлами
 *
 * @param string name
 * @param string smiles
 *
 * @return array
 */
function parseBlockSmile (name,smiles) {
	var indexStart, indexEnd, startString;

	startString = '['+name+']';

	indexStart = smiles.indexOf(startString);
	indexEnd = smiles.indexOf('[/'+name+']');

	if (indexStart === -1 || indexEnd === -1) {
		return [];
	}

	indexStart += startString.length;
	indexEnd -= startString.length;

	return smiles.substr(indexStart,indexEnd).trim().replace(/\[\/?\w+\]/ig,'').split('\n');
}

/**
 * ----
 *
 * Новые профили пользователей
 *
 * ----
 */

if (controller === 'member') {
	var content = $('#content');

	content.classList.add('miped-member');

	$$('.messageSimple img', content).forEach(function(avatar){
		avatar.src = avatar.src.replace(/\/s\//i,'/l/');
	});
	
	var tItem = $('input[name=_xfToken]'),
		token = tItem.defaultValue,
		action = tItem.formAction,
		imagesAvatars = [];
		
	if ($('.followBlocks')) {
		fetch( action+"followers?&_xfRequestUri="+action+"&_xfNoRedirect=1&_xfToken="+token+"&_xfResponseType=json", { credentials: 'include' })
		.then( function(response) { return response.text() })
		.then( function(body) {
			var newBody = JSON.parse(body);
			if (!newBody.error) {
				var el = parseHTML(newBody.templateHtml);
				$$('span.img', el).forEach( function(a) {
					var element = a.style.backgroundImage.split('"')[1].replace(/\/s\//i,'/l/');
					imagesAvatars.push(element);
				});
			} else {
				log('Ошибка: '+newBody.error);
			}
			
			var imagesCount = imagesAvatars.length - 1, imagesWidth = imagesCount * 100,
				canvasAvatars = [], ctx = [], cCount = 0;
			
			do {
				canvasAvatars.push(document.createElement('canvas'));
				/* Получить два мира 2D няшек куда лучше одного */
				var canvas = canvasAvatars[cCount];
				ctx.push(canvas.getContext('2d'));
				canvas.width = imagesWidth;
				canvas.height = 176;
				cCount++;
				log(cCount * imagesWidth);
			} while ((cCount * imagesWidth) <= 1800);
			 
			/* Загружаем все изображения */
			Promise.all(imagesAvatars.map(function(image){
				return new Promise(function(resolve,reject){
					var img = new Image;
			 
					img.src = image;
			 
					img.onload = function(){
						resolve(img);
					};
					img.onerror = reject;
				});
			}))
			.then(function(images) {
				return images.forEach(function(image,i){
					var offset = i*100;
					
					log('4');
					
					ctx.forEach( function(a) {
						a.drawImage(image,offset,0,176,176);
					});
				});
			})
			.then(function(){
				var mainText = $('.mainText'),
					qq = $('.section.primaryUserBlock'),
					ww = $('.mainTabs', qq),
					containForContain = document.createElement('div'),
					containForCanvas = document.createElement('div');
					
				containForContain.className = 'block';
				containForCanvas.className = 'massive';
				
				qq.insertBefore(containForContain, ww);
				containForContain.appendChild(containForCanvas);
				canvasAvatars.forEach( function(a) {
					containForCanvas.appendChild(a);
				});
			 
				// var dataURL = canvasAvatars.toDataURL();
				// mainText.style.background = 'url('+dataURL+')';
			 
				console.log('Скрипт закончил работу');
			})
			.catch(console.error);
		});
	} else {
		log('У пользователя нет подписчиков');
	}
	
	/**
	 * TODO: Добавить аватарку в профиль
	 * На данный момент без CSS
	 */
	 
	var list = $('#ProfilePostList');
	$$('.avatar', list).forEach( function(a) {
		var src = $('img', a).src;
		var avatar = createElement('div', {
			class: 'miped-member-avatar',
			style: 'background: url('+src+') center center; background-size: cover;'
		});
		a.appendChild(avatar);
	});
	
	/* 

	var avatar = createElement('img',{
		class: 'miped-member-avatar',
		src: $('.mast img',content).src
	});

	var title = $('.mainText h1',content);

	title.parentNode.insertBefore(avatar,title.nextSibling);

	*/
}

/**
 * ----
 *
 * Всё что находится внизу
 * Производительная и не костыльная реализация функционала
 *
 * ----
 */

/**
 * Возвращает URL от расширения
 *
 * @param string path
 *
 * @return string
 */
function getURL (path) {
	return chrome.extension.getURL(path);
}

/**
 * Снипет для одного элемента
 * (Снипет сворован с консоли)
 *
 * @param string selector
 * @param object context
 *
 * @return nodeElement
 */
function $ (selector,context) {
	return $$(selector,context)[0] || null;
}

/**
 * Производтельный QuerySelector
 *
 * @param string selector
 * @param object context
 *
 * @return array
 */
function $$ (selector,context) {
	context = context || document;

	if (!queryIsSimple.test(selector)) {
		return Array.prototype.slice.call(context.querySelectorAll(selector));
	}

	switch (selector.charAt(0)) {
		case '#':
			return [context.getElementById(selector.substr(1))];
		case '.':
			return Array.prototype.slice.call(context.getElementsByClassName(
				selector.substr(1).replace(/\./g,' ')
			));
		default:
			return Array.prototype.slice.call(context.getElementsByTagName(selector));
	}
}

/**
 * Живой обработчик событий
 *
 * @param mixed    element
 * @param string   name
 * @param string   selector
 * @param function handler
 */
function on (element,name,selector,handler) {
	if (typeof element === 'string') {
		element = $(element);
	}

	eventsList.push({
		name: name,
		element: element,
		handler: handler,
		selector: selector
	});

	element.addEventListener(name,function(event){
		var target = event.target;
		var current = event.currentTarget;

		while (target !== current && !target.matches(selector)) {
			target = target.parentNode;
		}

		if (target !== current) {
			handler.call(target,event);
		}
	},false);
}

/**
 * Удаляет живой обработчик событий
 *
 * @param function handler
 */
function off (handler) {
	eventsList.forEach(function(delegate,key){
		if (delegate.handler !== handler) {
			return;
		}

		delegate.removeEventListener(delegate.name,delegate.handler,false);
		eventsList.splice(key,1);
	});
}

/**
 * Логирует действия в консоль
 */
function log () {
	var args = Array.prototype.slice.call(arguments);

	args.unshift('%c[MipedSmiles]','background: #3949AB; color: #fff;padding: 1px 2px');

	console.log.apply(console,args);
}

/**
 * Возвращает значение иначе сохраняет его
 *
 * @param string key
 * @param mixed  value
 *
 * @return mixed
 */
function putStorage (key,value) {
	var storage = getStorage(key);

	if (storage === null) {
		return setStorage(key,value);
	}

	return storage;
}

/**
 * Проверяет наличие в локальном хранилище
 *
 * @param string key
 *
 * @return boolean
 */
function hasStorage (key) {
	return key in storageCache;
}

/**
 * Возвращает их хранилища
 *
 * @param string key
 * @param mixed  value
 *
 * @return mixed
 */
function getStorage (key,value) {
	if (hasStorage(key)) {
		return storageCache[key];
	}

	return value !== undefined?value:null;
}

/**
 * Устанавливает значение в хранилище
 *
 * @param string key
 * @param mixed  value
 *
 * @return mixed
 */
function setStorage (key,value) {
	storageCache = _getStorage();

	storageCache[key] = value;

	localStorage.setItem('MipedSmiles',JSON.stringify(storageCache));

	return storageCache[key];
}

/**
 * Возвращает полностью хранилище
 *
 * @private
 *
 * @return object
 */
function _getStorage () {
	var storage = localStorage.getItem('MipedSmiles');

	if (storage === null) {
		storage = {};
	} else {
		storage = JSON.parse(storage);
	}

	return storage;
}

/**
 * Парсирит HTML
 *
 * @param string html
 *
 * @return object
 */
function parseHTML (html) {
	var domParser = new DOMParser();

	domParser = domParser.parseFromString(html,'text/html');
	domParser = domParser.querySelector('body');

	return domParser.childNodes[0];
}

/**
 * Создаёт элемент с атрибутами
 *
 * @param string name
 * @param object options
 *
 * @return nodeElement
 */
function createElement (name,options) {
	options = options || {};

	var element = document.createElement(name), attribute;

	for (attribute in options) {
		element.setAttribute(attribute,options[attribute]);
	}

	return element;
}
