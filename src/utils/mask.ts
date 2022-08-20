export const maskEmail = (email: string) => {
	if (email) {
		const emailParts = email.split("@");
		if (emailParts.length > 1) {
			const emailPart1 = emailParts[0];
			const emailPart2 = emailParts[1];
			let numberOfStars = emailPart1.length - 4;
			const numberOfEndChars = numberOfStars < 2 ? 1 : 3;
			const replaceRegex =
				numberOfStars < 2
					? /^(.{1}).*(.{1}).*(.{1})$/
					: /^(.{1}).*(.{1}).*(.{3})$/;
			numberOfStars = emailPart1.length - numberOfEndChars - 1;
			const emailPart1Masked = emailPart1.replace(
				replaceRegex,
				`$1${"*".repeat(numberOfStars < 0 ? 0 : numberOfStars)}$3`
			);
			return emailPart1Masked + "@" + emailPart2;
		} else {
			return email;
		}
	}
	return email;
};

export const maskPhone = (phone: string) => {
	if (phone) {
		const numberOfStars = phone.length - 7;
		return phone.replace(
			/^(.{3}).*(.{3}).*(.{4})$/,
			`$1${"*".repeat(numberOfStars)}$3`
		);
	}
	return phone;
};
