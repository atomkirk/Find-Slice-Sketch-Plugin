var document = context.document;
document.currentPage().deselectAllLayers();

var sliceNames = sliceNames();
var selectedSliceName = createSelect("Select a slice:", sliceNames, 0);
var selectedSlice = sliceWithName(selectedSliceName);
[selectedSlice select:true byExpandingSelection:false];
document.currentView().centerRect(selectedSlice.rect());


// private

function createSelect(msg, items, selectedItemIndex){
  selectedItemIndex = selectedItemIndex || 0

  var accessory = [[NSComboBox alloc] initWithFrame:NSMakeRect(0,0,200,25)]
  [accessory addItemsWithObjectValues:items]
  [accessory selectItemAtIndex:selectedItemIndex]

  var alert = [[NSAlert alloc] init]
  [alert setMessageText:msg]
  [alert addButtonWithTitle:'OK']
  [alert addButtonWithTitle:'Cancel']
  [alert setAccessoryView:accessory]

  var responseCode = [alert runModal]
  var sel = [accessory indexOfSelectedItem]

  return items[sel]
}

function eachSlice(fn) {
  var slices = document.currentPage().exportableLayers();
  var loop = [slices objectEnumerator]
  while (slice = loop.nextObject()) {
    fn(slice);
  }
}

function sliceNames() {
  var names = [];
  eachSlice(function(slice) {
    names.push(slice.name());
  });
  return names;
}

function sliceWithName(name) {
  var sliceWithName = null;
  eachSlice(function(slice) {
    if (slice.name() == name) {
      sliceWithName = slice;
    }
  });
  return sliceWithName;
}
