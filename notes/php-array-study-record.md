#####数字索引数组

	$names = array('jiangbei', 'shabi');
	echo count($names).' ';
	
	for($i = 0; $i<count($names); $i++){
	    echo $names[$i].' ';
	}
	
	foreach($names as $item){
	    echo $item.' ';
	}
	
	
#####关联数组

	$prices = array('book'=> 12, 'bread'=> 21);
	foreach($prices as $key => $val){
	    echo $key.' <=> '.$val.'<br/>';
	}

#####list() each()方法
#####数组排序

	1. sort()
	2. asort()
	3. ksort()
	4. rsort()
	5. arsort()
	6. krsort()
	7. usort()
	8. array_reverse()
	9. shuffle()

#####