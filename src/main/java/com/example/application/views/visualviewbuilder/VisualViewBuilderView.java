package com.example.application.views.visualviewbuilder;

import com.example.application.data.SamplePerson;
import com.example.application.services.SamplePersonService;
import com.vaadin.flow.component.Composite;
import com.vaadin.flow.component.avatar.Avatar;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.checkbox.Checkbox;
import com.vaadin.flow.component.checkbox.CheckboxGroup;
import com.vaadin.flow.component.checkbox.CheckboxGroupVariant;
import com.vaadin.flow.component.datetimepicker.DateTimePicker;
import com.vaadin.flow.component.dependency.Uses;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.menubar.MenuBar;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.PasswordField;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.router.RouteAlias;
import com.vaadin.flow.spring.data.VaadinSpringDataHelpers;
import com.vaadin.flow.theme.lumo.LumoUtility.Gap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;

@PageTitle("Visual View Builder")
@Route(value = "visual-view-builder")
@RouteAlias(value = "")
@Uses(Icon.class)
public class VisualViewBuilderView extends Composite<VerticalLayout> {

    public VisualViewBuilderView() {
        Paragraph textLarge = new Paragraph();
        HorizontalLayout layoutRow = new HorizontalLayout();
        VerticalLayout layoutColumn2 = new VerticalLayout();
        H1 h1 = new H1();
        H2 h2 = new H2();
        Span badge = new Span();
        Avatar avatar = new Avatar();
        TextField textField = new TextField();
        PasswordField passwordField = new PasswordField();
        Checkbox checkbox = new Checkbox();
        CheckboxGroup checkboxGroup = new CheckboxGroup();
        VerticalLayout layoutColumn3 = new VerticalLayout();
        Button buttonPrimary = new Button();
        Button buttonSecondary = new Button();
        MenuBar menuBar = new MenuBar();
        DateTimePicker dateTimePicker = new DateTimePicker();
        Grid basicGrid = new Grid(SamplePerson.class);
        getContent().setHeightFull();
        getContent().setWidthFull();
        textLarge.setText(
                "vaadin-text-field and vaadin-button ChatGPT response is cached, all other components require ChatGPT token");
        textLarge.getStyle().set("font-size", "var(--lumo-font-size-xl)");
        getContent().setFlexGrow(1.0, layoutRow);
        layoutRow.setWidthFull();
        layoutRow.addClassName(Gap.MEDIUM);
        layoutRow.setFlexGrow(1.0, layoutColumn2);
        layoutColumn2.setHeightFull();
        layoutColumn2.setWidth(null);
        h1.setText("Heading");
        h2.setText("Heading");
        badge.setText("Badge");
        badge.getElement().getThemeList().add("badge");
        avatar.setName("Firstname Lastname");
        textField.setLabel("Text field");
        passwordField.setLabel("Password field");
        checkbox.setLabel("Checkbox");
        checkboxGroup.setLabel("Checkbox Group");
        checkboxGroup.setItems("Order ID", "Product Name", "Customer", "Status");
        checkboxGroup.addThemeVariants(CheckboxGroupVariant.LUMO_VERTICAL);
        layoutRow.setFlexGrow(1.0, layoutColumn3);
        layoutColumn3.setHeightFull();
        layoutColumn3.setWidth(null);
        buttonPrimary.setText("Button");
        buttonPrimary.addThemeVariants(ButtonVariant.LUMO_PRIMARY);
        buttonSecondary.setText("Button");
        setMenuBarSampleData(menuBar);
        dateTimePicker.setLabel("Date time picker");
        setGridSampleData(basicGrid);
        getContent().add(textLarge);
        getContent().add(layoutRow);
        layoutRow.add(layoutColumn2);
        layoutColumn2.add(h1);
        layoutColumn2.add(h2);
        layoutColumn2.add(badge);
        layoutColumn2.add(avatar);
        layoutColumn2.add(textField);
        layoutColumn2.add(passwordField);
        layoutColumn2.add(checkbox);
        layoutColumn2.add(checkboxGroup);
        layoutRow.add(layoutColumn3);
        layoutColumn3.add(buttonPrimary);
        layoutColumn3.add(buttonSecondary);
        layoutColumn3.add(menuBar);
        layoutColumn3.add(dateTimePicker);
        layoutColumn3.add(basicGrid);
    }

    private void setMenuBarSampleData(MenuBar menuBar) {
        menuBar.addItem("View");
        menuBar.addItem("Edit");
        menuBar.addItem("Share");
        menuBar.addItem("Move");
    }

    private void setGridSampleData(Grid grid) {
        grid.setItems(query -> samplePersonService.list(
                PageRequest.of(query.getPage(), query.getPageSize(), VaadinSpringDataHelpers.toSpringDataSort(query)))
                .stream());
    }

    @Autowired()
    private SamplePersonService samplePersonService;
}
