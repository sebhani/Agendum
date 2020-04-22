

class Menu extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={conpass} />
        <View style={styles.options}>
          <TouchableOpacity
            onPress={() => {
              return this.props.navigation.navigate("Calendar");
            }}
          >
            <Text style={styles.option}>{i18n.t("calendar")}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              return this.props.navigation.navigate("ShuttleSchedule");
            }}
          >
            <Text style={styles.option}>{i18n.t("shuttleBusSchedule")}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (this.props.accessibility) {
                return this.props.accessibilityOff();
              }
              return this.props.accessibilityOn();
            }}
          >
            <Text style={styles.option}>
              {this.props.accessibility
                ? i18n.t("accessibility_off")
                : i18n.t("accessibility_on")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              return this.props.navigation.navigate("Help");
            }}
          >
            <Text style={styles.option}>{i18n.t("help")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
