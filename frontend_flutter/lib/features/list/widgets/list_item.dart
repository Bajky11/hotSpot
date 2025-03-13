import 'package:before_leaving/common/providers/screen_controller_provider.dart';
import 'package:before_leaving/features/list/models/list_item.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class ListItem extends StatefulWidget {
  const ListItem({super.key, required this.listItem});

  final ListItemDto listItem;

  @override
  State<ListItem> createState() => _ListItemState();
}

class _ListItemState extends State<ListItem> {
  @override
  Widget build(BuildContext context) {
    final screenProvider = Provider.of<ScreenControllerProvider>(context);
    ThemeData theme = Theme.of(context);
    var primaryColor = theme.colorScheme.primary;
    var onPrimary = theme.colorScheme.onPrimary;
    var textStyle = theme.textTheme.displaySmall!.copyWith(color: onPrimary);

    return Card(
      color: primaryColor,
      child: InkWell(
        onTap: () => screenProvider.setDetailScreen(context),
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Text(widget.listItem.name, style: textStyle),
        ),
      ),
    );
  }
}
