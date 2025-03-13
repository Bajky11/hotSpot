import 'package:flutter/material.dart';

class DetailScreen extends StatefulWidget {
  const DetailScreen({super.key});

  @override
  State<DetailScreen> createState() => _DetailScreenState();
}

class _DetailScreenState extends State<DetailScreen> {
  List<Map<String, dynamic>> items = [
    {"text": "jedna", "checked": false},
    {"text": "dva", "checked": false}
  ];

  /// Zobrazí dialog a vrátí text nové položky
  Future<String?> _showAddItemDialog() async {
    TextEditingController controller = TextEditingController();

    return showDialog<String>(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text("Přidat novou poznámku"),
          content: TextField(
            controller: controller,
            decoration: const InputDecoration(hintText: "Zadejte text"),
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(context).pop(),
              child: const Text("Zrušit"),
            ),
            TextButton(
              onPressed: () => Navigator.of(context).pop(controller.text),
              child: const Text("Přidat"),
            ),
          ],
        );
      },
    );
  }

  /// Přidá novou položku do seznamu
  void _addItem(String text) {
    if (text.isNotEmpty) {
      setState(() {
        items.add({"text": text, "checked": false});
      });
    }
  }

  /// Odebere položku ze seznamu
  void _removeItem(int index) {
    setState(() {
      items.removeAt(index);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Seznam položek")),
      body: ListView.builder(
        itemCount: items.length,
        itemBuilder: (context, index) {
          return Card(
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Row(
                    children: [
                      Checkbox(
                        value: items[index]["checked"],
                        onChanged: (bool? newValue) {
                          setState(() {
                            items[index]["checked"] = newValue ?? false;
                          });
                        },
                      ),
                      Text(items[index]["text"]),
                    ],
                  ),
                  IconButton(
                    icon: const Icon(Icons.delete, color: Colors.red),
                    onPressed: () => _removeItem(index),
                  ),
                ],
              ),
            ),
          );
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () async {
          String? newItem = await _showAddItemDialog();
          if (newItem != null) _addItem(newItem);
        },
        child: const Icon(Icons.add),
      ),
    );
  }
}