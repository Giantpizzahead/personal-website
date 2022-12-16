module Jekyll
  class AlertBlock < Liquid::Block

    def initialize(tag_name, input, tokens)
      super
      @input = input
    end

    def render(context)
      # Switch statemenet based on input value
      case @input.strip
      when "note"
        alert_class = "note-msg"
        alert_icon = "fa-info-circle"
        alert_text = "Note"
      when "review"
        alert_class = "review-msg"
        alert_icon = "fa-check"
        alert_text = "Review"
      when "warning"
        alert_class = "warning-msg"
        alert_icon = "fa-warning"
        alert_text = "Warning"
      when "danger"
        alert_class = "danger-msg"
        alert_icon = "fa-times-circle"
        alert_text = "Danger"
      when "important"
        alert_class = "important-msg"
        alert_icon = "fa-star"
        alert_text = "Important"
      when "tip"
        alert_class = "tip-msg"
        alert_icon = "fa-lightbulb-o"
        alert_text = "Tip"
      else
        # Default to blank
        alert_class = "note-msg"
        alert_icon = ""
        alert_text = ""
      end

      # Render the block
      markdown = super
      # Convert markdown to HTML
      converter = context.registers[:site].find_converter_instance(Jekyll::Converters::Markdown)
      text = converter.convert(markdown)
      # Output the HTML
      output = "<div class=\"#{alert_class}\">"
      # If alert is not blank
      if alert_icon != "" or alert_text != "" then
        output += "<i class=\"fa #{alert_icon}\"></i>"
        output += "<strong style=\"margin-left: 0.15rem\"> #{alert_text}</strong>"
      end
      output += text
      output += "</div>"
      return output
    end

  end
end

Liquid::Template.register_tag('alert', Jekyll::AlertBlock)
  