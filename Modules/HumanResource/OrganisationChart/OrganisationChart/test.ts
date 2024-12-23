ElementArray[j].addEventListener("drop", function (event) {
    event.stopImmediatePropagation();
    var StartPointData = event.dataTransfer.getData('text/plain'); // oobtain the data of the dropped element
    if (isEmptyOrNull(StartPointData))
        return
    var StartPointJson = JSON.parse(StartPointData);
    var EventTargetElement = $(event.target)
    console.log(EventTargetElement)
    if (EventTargetElement.parent().attr('class').includes('title') || EventTargetElement.parent().attr('class').includes('btn')
        || EventTargetElement.parent().attr('class').includes('row'))
        EventTargetElement = EventTargetElement.parent()
    var destinationJson = JSON.parse(EventTargetElement.parent().attr('data-source'));
    var EventTargetHierarchy = destinationJson.nodeTitlePro
    if (!isEmptyOrNull(StartPointData)) {
        var StartPointTitle = null
        var StartPointName = null
        var StartPointId = null
        var StartPointHierarchy = null
        if (StartPointJson.external) { // externla move
            StartPointId = StartPointJson.id
            StartPointTitle = StartPointJson.title
            StartPointName = StartPointJson.name
            StartPointHierarchy = StartPointJson.nodeTitlePro
            console.log(EventTargetElement.parent())
            console.log(StartPointJson.parentId)
            console.log(destinationJson)
            console.log(isEmptyOrNull(destinationJson.parentId))
            if (EventTargetHierarchy >= StartPointHierarchy && !isEmptyOrNull(destinationJson.parentId)) {
                var String = capitalizeFirstLetter(getEnumNameFromValue(EventTargetHierarchy)) + ' cannot be above ' +
                    capitalizeFirstLetter(getEnumNameFromValue(StartPointHierarchy))
                notifyError(String)
                event.stopImmediatePropagation();
                return
            }
            var exactClassSelector = `[id="${StartPointJson.id}"]`;
            var elementExactClass = $(exactClassSelector)
            regex = /card\s+(\w+\s+\w+)\s+Class/;
        }
        var targetElementId = parseInt(EventTargetElement.parent().attr('class').replace('node', '').replace('Class', '').trim())
        if (targetElementId == parseInt(StartPointJson.parentId) &&
            StartPointJson.parentId !== undefined && targetElementId !== undefined)
            return
        if (isEmptyOrNull(StartPointJson.parentId) && isEmptyOrNull(StartPointJson.external))
            return
        if (isEmptyOrNull(EventTargetElement.parent().attr('class')))
            return
        var ClassName = StartPointJson.className
        if (StartPointHierarchy == null)
            StartPointHierarchy = StartPointJson.nodeTitlePro
        var DestinationNode = EventTargetElement.parent().attr('class').replace('node', '').trim().replace('focused', '')
        if (DestinationNode == ClassName)
            return
        if (StartPointHierarchy == EmployeeEnum) {
            let i = 0
            var EmployeeRowId = parseInt(StartPointJson.nodeContentPro)
            for (i = 0; i < ListOfEmployeeData.length; i++) {
                if (ListOfEmployeeData[i]["id"] == EmployeeRowId)
                    break
            }
            var parentId, prev_id, prev_key;
            var containerDiv = $('#orgChartContainer');
            for (const value of sortedValues) {
                var key = Object.keys(CardType).find(key => CardType[key as keyof typeof CardType] == value);
                console.log('hereee')
                console.log(key)
                var id = ListOfEmployeeData[i][`${capitalizeFirstLetter(key)}Id`]
                var className = `node ${key}${id} Class`
                var exactClassSelector = `[class="${className}"]`;
                var elementExactClass = containerDiv.find(exactClassSelector)
                console.log(exactClassSelector)
                var supposedParentId = elementExactClass.attr('data-parent')
                if (!isEmptyOrNull(parentId)) {
                    console.log(parentId)
                    console.log(id)
                    console.log(key)
                    if (parentId != id) {
                        notifyError('Error in employee profile')
                        var correct1 = GetLookupValueFromId(capitalizeFirstLetter(key), ListOfEmployeeData[i][capitalizeFirstLetter(key) + 'Id'])
                        var correct2 = GetLookupValueFromId(capitalizeFirstLetter(prev_key), ListOfEmployeeData[i][capitalizeFirstLetter(prev_key) + 'Id'])
                        alertDialog(`${ListOfEmployeeData[i]["EmployeeName"]} should be in ${correct2} ${capitalizeFirstLetter(prev_key)}, under ${correct1} ${capitalizeFirstLetter(key)}`)
                        return
                    }
                }
                else {
                    console.log(EventTargetHierarchy)
                    if (EventTargetHierarchy != EmployeeEnum) {
                        console.log(ListOfEmployeeData[i][capitalizeFirstLetter(key) + 'Id'])
                        console.log(id)
                        var TargetedId = parseInt(StartPointJson.className.match(/\d+/)[0])
                        if (TargetedId != id) {
                            console.log(key)
                            console.log(Object.keys(CardType).find(key => CardType[key as keyof typeof CardType] == (value - 1)))
                            var correct1 = GetLookupValueFromId(capitalizeFirstLetter(key), ListOfEmployeeData[i][capitalizeFirstLetter(key) + 'Id'])
                            var NextKey = Object.keys(CardType).find(key => CardType[key as keyof typeof CardType] == (value - 1));
                            var correct2 = GetLookupValueFromId(capitalizeFirstLetter(NextKey), ListOfEmployeeData[i][capitalizeFirstLetter(NextKey) + 'Id'])
                            alertDialog(`${ListOfEmployeeData[i]["EmployeeName"]} should be in ${correct1} ${capitalizeFirstLetter(key)}, under ${correct2} ${capitalizeFirstLetter(NextKey)}`)
                            return
                        }
                    }
                }
                console.log(supposedParentId)
                parentId = parseInt(supposedParentId.match(/\d+/)[0])
                prev_id = parentId
                prev_key = key
            }
        }


        if (StartPointJson.external == null) {
            if (StartPointHierarchy == EmployeeEnum)
                StartPointTitle = findTitleByClassName(FinalDatascource2, ClassName);
            else
                StartPointTitle = findTitleByClassName(datascource2, ClassName);
        }
        if (StartPointId == null) {
            if (StartPointHierarchy == EmployeeEnum)
                StartPointId = findIdByClassName(FinalDatascource2, ClassName);
            else
                StartPointId = findIdByClassName(datascource2, ClassName);
        }
        console.log(StartPointId)
        console.log(StartPointTitle)

        if (StartPointName == null) {
            StartPointName = ClassName.replace('Class', '').trim()
            StartPointName = StartPointName.replace('focused', '')
        }
        StartPointName = StartPointName.replace('focused', '')

        console.log(StartPointHierarchy)
        console.log(EventTargetElement.parent().attr('data-source'))
        console.log(destinationJson)
        console.log('from ' + StartPointJson.className)
        console.log('to ' + EventTargetElement.parent().attr('class'))
        var regex = /EmployeeRowId:\d+\s*/;
        var child_list
        if (StartPointHierarchy == EmployeeEnum)
            child_list = findChildrenByClassName(FinalDatascource2, ClassName)
        else
            child_list = findChildrenByClassName(datascource2, ClassName)
        for (var index in child_list) {
            if (child_list[index].id == StartPointJson.id)
                return
        }
        var ParentId = StartPointJson.parentId
        console.log(ParentId)
        console.log(StartPointJson)
        // return
        var HierarchyValue = parseInt(StartPointJson.nodeTitlePro)
        // console.log(EventTargetJson)
        var HierarchyNodeTitlePro = parseInt(StartPointJson.nodeContentPro)
        var bufferNode: Node = {
            'nodeContentPro': null,
            'nodeTitlePro': HierarchyValue, 'id': StartPointId, 'name': StartPointTitle,
            'title': StartPointTitle, 'className': `${id} Class`
        };
        console.log(bufferNode)
        if (StartPointHierarchy == EmployeeEnum) {
            bufferNode.nodeContentPro = HierarchyNodeTitlePro
            bufferNode.className = `${bufferNode.className}`
        }
        if (StartPointHierarchy == EmployeeEnum) {
            console.log(FinalDatascource2)
            console.log(ClassName)
            console.log(StartPointTitle)
            if (checkRepeatedChildren(FinalDatascource2, DestinationNode, bufferNode))//check repeated children
                return
            FinalDatascource2 = deleteNodeByClassNameAndTitle(FinalDatascource2, ClassName, StartPointTitle)
        }
        else {
            if (checkRepeatedChildren(datascource2, DestinationNode, bufferNode))//check repeated children
                return
            datascource2 = deleteNodeByClassNameAndTitle(datascource2, ClassName, StartPointTitle)
        }
        if (!isEmptyOrNull(ParentId))
            ParentId = ParentId + ' Class';
        console.log(datascource2)
        for (var index in child_list) {
            console.log(StartPointJson.nodeTitlePro)
            var bufferNodeId = child_list[index].id
            if (StartPointHierarchy == EmployeeEnum)
                bufferNodeId = `EMPLOYEE${child_list[index].id} Class`
            var bufferNode: Node = {
                'nodeContentPro': null,
                'nodeTitlePro': child_list[index].nodeTitlePro, 'id': bufferNodeId, 'name': child_list[index].name,
                'title': child_list[index].title, 'className': child_list[index].id + " Class"
            };
            if (StartPointHierarchy == EmployeeEnum)
                addChildren(FinalDatascource2, ParentId, bufferNode)
            else
                addChildren(datascource2, ParentId, bufferNode)
            /*
            console.log('haha')
            console.log(bufferNode)
            console.log(ParentId)
            console.log('from ' + child_list[index].title)
            console.log('to ' + EventTargetElement.parent().attr('class'))
            console.log(datascource2)
            console.log(addChildren(datascource2, ParentId, bufferNode))
            */
        }
        if (StartPointHierarchy == EmployeeEnum) {
            console.log(FinalDatascource2)
            addChildren(FinalDatascource2, DestinationNode, bufferNode)
            removeEmptyChildren(FinalDatascource2)
            var orgChartElement = document.getElementById("orgChartContainer")
            orgChartElement.innerHTML = ''
            //for (let i = 0; i < orgChartElement.children.length; i++)
            //orgChartElement.children[i].remove()
            if (!isEmptyOrNull(FinalDatascource2))
                GenerateSaveFinalOrgChart()
        }
        else {
            addChildren(datascource2, DestinationNode, bufferNode)
            removeEmptyChildren(datascource2)
            var orgChartElement = document.getElementById("chart-container")
            orgChartElement.innerHTML = ''
            for (let i = 0; i < orgChartElement.children.length; i++)
                orgChartElement.children[i].remove()
            if (!isEmptyOrNull(datascource2))
                GenerateSaveOrgChart()
        }
        setCallbacks()
        event.dataTransfer.dropEffect = 'none';
        ClearEmptyTd()
    }
})































































    `
                                ElementArray[j].addEventListener("drop", function (event) {
                                event.stopImmediatePropagation();
                                console.log(FinalDatascource2)
                                var StartPointData = event.dataTransfer.getData('text/plain'); // oobtain the data of the dropped element
                                if (isEmptyOrNull(StartPointData))
                                return
                                const jsonObject = JSON.parse(StartPointData);
                                var EventTargetElement = $(event.target)
                                console.log(EventTargetElement)
                                if (EventTargetElement.parent().attr('class').includes('title') || EventTargetElement.parent().attr('class').includes('btn')
                                || EventTargetElement.parent().attr('class').includes('row'))
                                    EventTargetElement = EventTargetElement.parent()
                                var destinationJson = JSON.parse(EventTargetElement.parent().attr('data-source'));
                                var EventTargetHierarchy = destinationJson.nodeTitlePro
                                if (!isEmptyOrNull(StartPointData)) {
                                    var title = null
                                    var name = null
                                    var EmployeeName = null
                                    var id = null
                                    var hierarchy = null
                                    if (jsonObject.external) { // externla move
                                        id = jsonObject.id
                                        title = jsonObject.title
                                        name = jsonObject.name
                                        hierarchy = jsonObject.nodeTitlePro
                                        console.log(EventTargetElement.parent())
                                        console.log(jsonObject.parentId)
                                        console.log(destinationJson)
                                        console.log(isEmptyOrNull(destinationJson.parentId))
                                        if (EventTargetHierarchy >= hierarchy && !isEmptyOrNull(destinationJson.parentId)) {
                                            var String = capitalizeFirstLetter(getEnumNameFromValue(EventTargetHierarchy)) + ' cannot be above ' +
                                                capitalizeFirstLetter(getEnumNameFromValue(hierarchy))
                                            notifyError(String)
                                            event.stopImmediatePropagation();
                                            return
                                        }
                                        var exactClassSelector = `[id = "${jsonObject.id}"]`;
                                        var elementExactClass = $(exactClassSelector)
                                        regex = /card\s+(\w+\s+\w+)\s+Class/;
                                    }
                                    var targetElementId = parseInt(EventTargetElement.parent().attr('class').replace('node', '').replace('Class', '').trim())
                                    if (targetElementId == parseInt(jsonObject.parentId) &&
                                        jsonObject.parentId !== undefined && targetElementId !== undefined)
                                        return
                                    if (isEmptyOrNull(jsonObject.parentId) && isEmptyOrNull(jsonObject.external))
                                        return
                                    if (isEmptyOrNull(EventTargetElement.parent().attr('class')))
                                        return
                                    var ClassName = jsonObject.className
                                    if (hierarchy == null)
                                        hierarchy = jsonObject.nodeTitlePro
                                    var DestinationNode = EventTargetElement.parent().attr('class').replace('node', '').trim().replace('focused', '')
                                    if (DestinationNode == ClassName)
                                        return
                                    if (hierarchy == EmployeeEnum) {
                                        let i =0
                                        var EmployeeRowId = parseInt(jsonObject.nodeContentPro)
                                        for ( i = 0; i < ListOfEmployeeData.length; i++) {
                                            if (ListOfEmployeeData[i]["id"] == EmployeeRowId)
                                                break
                                        }
                                        var parentId, prev_id, prev_key;
                                        var containerDiv = $('#orgChartContainer');
                                        for (const value of sortedValues) {
                                            var key = Object.keys(CardType).find(key => CardType[key as keyof typeof CardType] == value);
                                            console.log('hereee')
                                            console.log(key)
                                            var id = ListOfEmployeeData[i][`${ capitalizeFirstLetter(key) } Id`]
                                            var className = `node ${ key }${ id } Class`
                                            var exactClassSelector = `[class= "${className}"]`;
                                            var elementExactClass = containerDiv.find(exactClassSelector)
                                            console.log(exactClassSelector)
                                            var supposedParentId = elementExactClass.attr('data-parent')
                                            if (!isEmptyOrNull(parentId)) {
                                                console.log(parentId)
                                                console.log(id)
                                                console.log(key)

                                                if (parentId != id) {
                                                    notifyError('Error in employee profile')
                                                    var correct1 = GetLookupValueFromId(capitalizeFirstLetter(key), ListOfEmployeeData[i][capitalizeFirstLetter(key) + 'Id'])
                                                    var correct2 = GetLookupValueFromId(capitalizeFirstLetter(prev_key), ListOfEmployeeData[i][capitalizeFirstLetter(prev_key) + 'Id'])
                                                    alertDialog(`${ ListOfEmployeeData[i]["EmployeeName"] } should be in ${ correct2 } ${ capitalizeFirstLetter(prev_key) }, under ${ correct1 } ${ capitalizeFirstLetter(key) } `)
                                                    return
                                                }
                                            }
                                            else {
                                                console.log(ListOfEmployeeData[i][capitalizeFirstLetter(key) + 'Id'])
                                                console.log(id)
                                                var TargetedId = parseInt(jsonObject.className.match(/\d+/)[0])
                                                if (TargetedId != id) {
                                                    console.log(key)
                                                    console.log(Object.keys(CardType).find(key => CardType[key as keyof typeof CardType] == (value - 1)))
                                                    var correct1 = GetLookupValueFromId(capitalizeFirstLetter(key), ListOfEmployeeData[i][capitalizeFirstLetter(key) + 'Id'])
                                                    var NextKey = Object.keys(CardType).find(key => CardType[key as keyof typeof CardType] == (value - 1));
                                                    var correct2 = GetLookupValueFromId(capitalizeFirstLetter(NextKey), ListOfEmployeeData[i][capitalizeFirstLetter(NextKey) + 'Id'])
                                                    alertDialog(`${ ListOfEmployeeData[i]["EmployeeName"] } should be in ${ correct1 } ${ capitalizeFirstLetter(key) }, under ${ correct2 } ${ capitalizeFirstLetter(NextKey) } `)
                                                    return
                                                }
                                            }
                                            console.log(supposedParentId)
                                            parentId = parseInt(supposedParentId.match(/\d+/)[0])
                                            prev_id = parentId
                                            prev_key = key
                                        }
                                    }
                                    

                                    if (jsonObject.external == null) {
                                        if (hierarchy == EmployeeEnum)
                                            title = findTitleByClassName(FinalDatascource2, ClassName);
                                        else
                                            title = findTitleByClassName(datascource2, ClassName);
                                    }
                                    if (id == null) {
                                        if (hierarchy == EmployeeEnum)
                                            id = findIdByClassName(FinalDatascource2, ClassName);
                                        else
                                            id = findIdByClassName(datascource2, ClassName);
                                    }
                                    console.log(id)
                                    console.log(title)

                                    if (name == null) {
                                        name = ClassName.replace('Class', '').trim()
                                        name = name.replace('focused', '')
                                    }
                                    name = name.replace('focused', '')
                                    if (EmployeeName == null)
                                        EmployeeName = jsonObject.name
                                    console.log(hierarchy)
                                    console.log(EventTargetElement.parent().attr('data-source'))
                                    console.log(destinationJson)
                                    console.log('from ' + jsonObject.className)
                                    console.log('to ' + EventTargetElement.parent().attr('class'))
                                    var regex = /EmployeeRowId:\d+\s*/;
                                    var child_list
                                    if (hierarchy == EmployeeEnum)  
                                        child_list = findChildrenByClassName(FinalDatascource2 , ClassName)
                                    else
                                        child_list = findChildrenByClassName(datascource2, ClassName)
                                    for (var index in child_list) {
                                        if (child_list[index].id == jsonObject.id)
                                            return
                                    }
                                    var ParentId = jsonObject.parentId
                                    console.log(ParentId)
                                    console.log(jsonObject)
                                    // return
                                    var HierarchyValue = parseInt(jsonObject.nodeTitlePro)
                                   // console.log(EventTargetJson)
                                    var HierarchyNodeTitlePro = parseInt(jsonObject.nodeContentPro)
                                    var bufferNode: Node = {
                                        'nodeContentPro': null,
                                        'nodeTitlePro': HierarchyValue, 'id': id, 'name': title,
                                        'title': title, 'className': `${ id } Class`
                                    };
                                    console.log(bufferNode)
                                    if (hierarchy == EmployeeEnum ) {
                                        bufferNode.nodeContentPro = HierarchyNodeTitlePro
                                        bufferNode.className = `${ bufferNode.className } `
                                    }
                                    if (hierarchy == EmployeeEnum)
                                    {
                                        console.log(FinalDatascource2)
                                        console.log(ClassName)
                                        console.log(title)
                                        if (checkRepeatedChildren(FinalDatascource2, DestinationNode, bufferNode))//check repeated children
                                            return
                                        FinalDatascource2 = deleteNodeByClassNameAndTitle(FinalDatascource2, ClassName, title)
                                    }
                                    else {
                                        if (checkRepeatedChildren(datascource2, DestinationNode, bufferNode))//check repeated children
                                            return
                                        datascource2 = deleteNodeByClassNameAndTitle(datascource2, ClassName, title)
                                    }
                                    if (!isEmptyOrNull(ParentId))
                                        ParentId = ParentId + ' Class';
                                    console.log(datascource2)
                                    for (var index in child_list) {
                                        console.log(jsonObject.nodeTitlePro)
                                        var bufferNodeId = child_list[index].id
                                        if (hierarchy == EmployeeEnum) 
                                            bufferNodeId = `EMPLOYEE${ child_list[index].id } Class`
                                        var bufferNode: Node = {
                                            'nodeContentPro': null,
                                            'nodeTitlePro': child_list[index].nodeTitlePro, 'id': bufferNodeId, 'name': child_list[index].name,
                                            'title': child_list[index].title, 'className': child_list[index].id + " Class"
                                        };
                                        if (hierarchy == EmployeeEnum) 
                                            addChildren(FinalDatascource2, ParentId, bufferNode)
                                        else
                                            addChildren(datascource2, ParentId, bufferNode)
                                        /*
                                        console.log('haha')
                                        console.log(bufferNode)
                                        console.log(ParentId)
                                        console.log('from ' + child_list[index].title)
                                        console.log('to ' + EventTargetElement.parent().attr('class'))
                                        console.log(datascource2)
                                        console.log(addChildren(datascource2, ParentId, bufferNode))
                                        */
                                    }
                                    if (hierarchy == EmployeeEnum ) {
                                        console.log(FinalDatascource2)
                                        addChildren(FinalDatascource2, DestinationNode, bufferNode)
                                        removeEmptyChildren(FinalDatascource2)
                                        var orgChartElement = document.getElementById("orgChartContainer")
                                        orgChartElement.innerHTML = ''
                                        //for (let i = 0; i < orgChartElement.children.length; i++)
                                            //orgChartElement.children[i].remove()
                                        if (!isEmptyOrNull(FinalDatascource2))
                                            GenerateSaveFinalOrgChart()
                                    }
                                    else {
                                        addChildren(datascource2, DestinationNode, bufferNode)
                                        removeEmptyChildren(datascource2)
                                        var orgChartElement = document.getElementById("chart-container")
                                        orgChartElement.innerHTML = ''
                                        for (let i = 0; i < orgChartElement.children.length; i++)
                                            orgChartElement.children[i].remove()
                                        if (!isEmptyOrNull(datascource2)) 
                                            GenerateSaveOrgChart()
                                    }
                                    setCallbacks()
                                    event.dataTransfer.dropEffect = 'none';
                                    ClearEmptyTd()
                                }
                            })
                            
                                    `