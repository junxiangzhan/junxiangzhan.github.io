// JavaScript Document

new Vue( {
	el: '#app',
	data: {
		alert_msg: null,
		
		news_id: 0,
		news: [ {
			title: "抽獎活動！我想要吃爆米花！",
			date: "2021.12.01",
			content: "抽獎活動又來了！\n我們將會抽出 5 位幸運兒\n獲得我們的「爆米花兌換券」 乙張\n只要完成下列步驟，就能參加抽獎！\n- 按讚粉絲專頁及這篇貼文\n- 在下方留言「我想要吃爆米花！」並 Tag 兩位好友\n- 公開分享這篇貼文，讓更多人知道！\n\n馬上把握機會吧！",
			img: "images/007.png"
		}, {
			title: "口味新上市！四川香麻辣！",
			date: "2021.11.20",
			content: "最新口味上市囉！\n從 12/01 開始\n不論是在線上或實體店面\n都能買到「四川香麻辣爆米花」！\n馬上來品嚐一下吧！",
			img: "images/008.png"
		}, {
			title: "【推廣活動】讓我們一起吃道這個美好滋味吧！",
			date: "2021.11.01",
			content: "早已忘卻了那心中的美好滋味嗎？\n讓我們到「黑糖啵啵爆米花」回憶一下吧！\n我們除了在全台各地皆有分店\n也可以直接在線上下單\n讓你在家也以吃到兒時的好味道！",
			img: "images/009.png"
		}, {
			title: "抽獎活動出爐！",
			date: "2021.10.22",
			content: "得獎名單出爐囉！\n我們已經私訊名位得主\n請一定要在 10/25 以前回覆我們\n否則將視同放棄哦！\n沒得獎的朋友也不要氣餒！\n也許下次得主就是你！",
			img: "images/010.png"
		}, {
			title: "抽獎活動！疫起在家吃！",
			date: "2021.10.15",
			content: "抽獎活動又來了！\n我們將會抽出 5 位幸運兒\n獲得我們的「爆米花線上兌換券」 乙份\n只要完成下列步驟，就能參加抽獎！\n- 按讚粉絲專頁及這篇貼文\n- 在下方留言「疫起在家吃！」並 Tag 兩位好友\n- 公開分享這篇貼文，讓更多人知道！\n\n馬上把握機會吧！",
			img: "images/011.png"
		}],
		
		cart: null,
		goods: [ {
			name: "招牌黑糖口味",
			content: "嚴選台南關山的手工柴燒黑糖，保留甘蔗香氣，搭配焦香後味的爆米花，唰嘴爽口停不下手。",
			cost: 250,
			img: "images/012.png"
		}, {
			name: "馬告胡椒口味",
			content: "有著山中胡椒稱號的馬告，是極為珍貴的天然香料，其多層次的味道，一次就讓你印象深刻。",
			cost: 280,
			img: "images/013.png"
		}, {
			name: "木瓜牛奶口味",
			content: "選用台南小農木瓜搭配飛鷹煉乳，甜而不膩的口味，一口接著一口停不下來。",
			cost: 280,
			img: "images/014.png"
		}, {
			name: "四川麻辣口味",
			content: "以中藥、牛油和花椒調配出的四川麻辣味，道地得像吃了一鍋麻辣鍋。",
			cost: 300,
			img: "images/015.png"
		}],
		
		deal: null,
		search: {},
		
		robot: []
	},
	
	methods: {
		alert: function ( msg ) {
			this.alert_msg = msg;
			$('#alert').modal();
		},
		
		set: function ( key, value ) {
			this[key] = value;
		},
		
		sum: function ( cart ) {
			return cart.reduce(( a, b ) => a + b, 0 );
		},
		
		total: function ( cart ) {
			return cart.reduce(( a, b, i ) => a + b * this.goods[i].cost, 0 );
		},
		
		cartAdd: function ( id ) {
			this.cart[id]++;
			this.cart = this.cart.slice();
		},
		
		cartMinus: function ( id ) {
			if ( !this.cart[id] ) return ;
			this.cart[id]--;
			this.cart = this.cart.slice();
		},
		
		cartRemove: function ( id ) {
			this.cart[id] = 0;
			this.cart = this.cart.slice();
		},
		
		cartClear: function () {
			this.cart = Array( 4 ).fill( 0 );
		},
		
		send: function () {
			const cart = this.cart.slice();
			$.ajax( {
				url: 'send.php',
				data: { cart: JSON.stringify(cart)},
				success: id => {
					this.deal = { id, cart };
					this.cart = Array( 4 ).fill( 0 );
					$('#cart, #deal').modal('toggle');
				}
			});
		},
		
		get: function () {
			const id = $('#id').val();
			$.ajax( {
				url: 'get.php',
				data: { id },
				success: cart => {
					this.search = { id, cart };
				}
			});
		},
		
		robotSend: function () {
			const text = $('#text').val();
			$('#text').val('');
			
			if ( !text ) return ;
			
			this.robot.push([ 1, text ]);
			this.robot = this.robot.slice();
			
			setTimeout( () => {
				this.robot.push([ 0, (({
					'查看消息': function () {
						$('#content, html').scrollTop( $('#news').offset().top - $('#top').offset().top );
						return '已幫您跳轉至「活動消息」頁面囉！';
					},
					
					'前往購物': function () {
						$('#content, html').scrollTop( $('#shop').offset().top - $('#top').offset().top );
						return '已幫您跳轉至「線上商店」頁面囉！';
					},
					
					'聯絡我們': function () {
						$('#content, html').scrollTop( $('#contact').offset().top - $('#top').offset().top );
						return '已幫您跳轉至「聯絡我們」頁面囉！';
					},
					
					'查詢訂單': function () {
						$('#search').modal();
						return '已幫您將「訂單查詢」視窗開啟囉！';
					}
				})[text] ?? function () {
					return [
						[ '好的。', '了解了。' ][ Math.floor( Math.random() * 2 )],
						[ '已通知服務人員', '將有專人來' ][ Math.floor( Math.random() * 2 )],
						[ '幫您處理問題。', '為您服務。' ][ Math.floor( Math.random() * 2 )]
					].join('');
				})() ]);
				this.robot = this.robot.slice();
			}, 500 );
		}
	},
	
	watch: {
		news_id: function () {
			$('#news .content').scrollTop(0);
		},
		
		robot: function () {
			const $0 = $('#robot .card-body');
			setTimeout( () => $0.scrollTop( $0[0].scrollHeight ));
		}
	},
	
	created: function () {
		this.$ = jQuery;
		this.cart = Array( 4 ).fill( 0 );
		
		const handle = function () {
			$('section').each( function () {
				$(this).offset().top - window.innerHeight * .9 < window.scrollY ?? $('#content').scrollTop()? $(this).removeAttr('style'): $(this).css( {
					opacity: 0,
					transform: 'translateY(-5%) scale(.9)'
				});
			});
		};
		
		$(() => {
			handle();
			$("#content").scroll( handle ).resize( handle );
			$( document ).scroll( handle ).resize( handle );
		});
	}
});
